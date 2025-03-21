import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

const ResourceUpload = ({ communityId }) => {
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchResources();
  }, [communityId]);

  const fetchResources = async () => {
    try {
      const { data, error } = await supabase
        .from('resources')
        .select('*, users(name)')
        .eq('community_id', communityId);

      if (error) throw error;
      setFiles(data);
    } catch (error) {
      console.error('Error fetching resources:', error);
    }
  };

  const handleUpload = async (event) => {
    try {
      setUploading(true);
      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Date.now()}-${Math.random()}.${fileExt}`;
      const filePath = `${communityId}/${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('resources')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('resources')
        .getPublicUrl(filePath);

      const publicUrl = data.publicUrl;

      const { error: dbError } = await supabase.from('resources').insert({
        community_id: communityId,
        uploaded_by: '4b24440e-e77c-4a27-a1a7-7f2f6a4c4c4c',
        file_url: publicUrl,
        file_name: file.name,
      });

      if (dbError) throw dbError;
      fetchResources();
    } catch (error) {
      console.error('Error uploading file:', error);
      alert('Error uploading file: ' + error.message);
    } finally {
      setUploading(false);
      event.target.value = '';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Resources</h2>
        <input
          type="file"
          onChange={handleUpload}
          disabled={uploading}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="bg-blue-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-blue-600"
        >
          {uploading ? 'Uploading...' : 'Upload File'}
        </label>
      </div>
      <div className="grid grid-cols-1 gap-4">
        {files.map((file) => (
          <div
            key={file.id}
            className="flex items-center justify-between p-4 bg-white rounded-lg shadow"
          >
            <div>
              <p className="font-medium">{file.file_name}</p>
              <p className="text-sm text-gray-500">
                Uploaded by {file.users.name}
              </p>
            </div>
            <a
              href={file.file_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 hover:text-blue-600"
            >
              Download
            </a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ResourceUpload;
