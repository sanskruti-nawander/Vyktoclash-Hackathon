import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';

const MembersList = ({ communityId }) => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMembers();
  }, [communityId]);

  const fetchMembers = async () => {
    try {
      const { data, error } = await supabase
        .from('memberships')
        .select(`
          *,
          users (
            id,
            name,
            email
          )
        `)
        .eq('community_id', communityId);

      if (error) throw error;
      setMembers(data || []);
    } catch (error) {
      console.error('Error fetching members:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <h3 className="text-lg font-semibold mb-4">Members</h3>
      {loading ? (
        <div className="flex justify-center">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <div className="space-y-3">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded-md"
            >
              <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
                {member.users.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <p className="font-medium text-gray-800">{member.users.name}</p>
                <p className="text-sm text-gray-500">{member.users.email}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MembersList; 