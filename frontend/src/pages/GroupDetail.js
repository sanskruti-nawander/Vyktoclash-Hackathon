import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import Channel from '../components/Community/Channel';
import ResourceUpload from '../components/Community/ResourceUpload';
import Chatbox from '../components/Community/Chatbox';
import MembersList from '../components/Community/MembersList';

const GroupDetail = () => {
  const { id } = useParams();
  const [community, setCommunity] = useState(null);
  const [activeChannel, setActiveChannel] = useState('general');
  const [channels, setChannels] = useState([]);
  const [showMembers, setShowMembers] = useState(false);

  useEffect(() => {
    fetchCommunityDetails();
    fetchChannels();
  }, [id]);

  const fetchCommunityDetails = async () => {
    try {
      const { data, error } = await supabase
        .from('communities')
        .select('*, users(name)')
        .eq('id', id)
        .single();

      if (error) throw error;
      setCommunity(data);
    } catch (error) {
      console.error('Error fetching community details:', error);
    }
  };

  const fetchChannels = async () => {
    try {
      const { data, error } = await supabase
        .from('channels')
        .select('*')
        .eq('community_id', id);

      if (error) throw error;
      setChannels(data);
    } catch (error) {
      console.error('Error fetching channels:', error);
    }
  };

  const renderChannelContent = () => {
    switch (activeChannel) {
      case 'resources':
        return (
          <div className="bg-white rounded-lg shadow p-6">
            <ResourceUpload communityId={id} />
          </div>
        );
      case 'general':
        return <Chatbox communityId={id} channelType="General" />;
      case 'challenges':
        return <Channel communityId={id} channelType="Challenges" />;
      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="w-64 bg-gray-800 text-white p-4">
        <h2 className="text-xl font-bold mb-4">{community?.name}</h2>
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={() => setShowMembers(!showMembers)}
            className="text-sm text-gray-300 hover:text-white flex items-center"
          >
            <span className="mr-2">��</span>
            View Members
          </button>
        </div>
        <nav>
          {channels.map((channel) => (
            <button
              key={channel.id}
              onClick={() => setActiveChannel(channel.type.toLowerCase())}
              className={`w-full text-left p-2 rounded ${
                activeChannel === channel.type.toLowerCase()
                  ? 'bg-gray-700'
                  : 'hover:bg-gray-700'
              }`}
            >
              # {channel.name}
            </button>
          ))}
        </nav>
      </div>
      <div className="flex-1 p-6 flex">
        <div className={`flex-1 ${showMembers ? 'mr-4' : ''}`}>
          {renderChannelContent()}
        </div>
        {showMembers && (
          <div className="w-64">
            <MembersList communityId={id} />
          </div>
        )}
      </div>
    </div>
  );
};

export default GroupDetail;