import React, { useEffect, useState } from 'react';
import { supabase } from '../supabaseClient';
import GroupCard from '../components/Community/GroupCard';
import CommunitySidebar from '../components/Community/CommunitySidebar';
import CreateCommunityModal from '../components/Community/CreateCommunityModal';

const Community = () => {
  const [communities, setCommunities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    fetchCommunities();
  }, []);

  const fetchCommunities = async () => {
    try {
      const { data, error } = await supabase
        .from('communities')
        .select(`
          *,
          users (name),
          memberships (count)
        `)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setCommunities(data);
    } catch (error) {
      console.error('Error fetching communities:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-[#f2f3f5]">
      <CommunitySidebar />
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">All Communities</h1>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-indigo-500 text-white px-4 py-2 rounded-lg hover:bg-indigo-600 transition-colors"
            >
              Create Community
            </button>
          </div>
          
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {communities.map((community) => (
                <GroupCard key={community.id} community={community} />
              ))}
            </div>
          )}
        </div>
      </main>

      <CreateCommunityModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={() => {
          fetchCommunities();
        }}
      />
    </div>
  );
};

export default Community;