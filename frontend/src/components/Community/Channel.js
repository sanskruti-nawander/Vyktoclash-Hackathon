import React, { useState, useEffect } from 'react';
import { supabase } from '../../supabaseClient';
import CreateChallengeModal from './CreateChallengeModal';

const Channel = ({ communityId, channelType }) => {
  const [challenges, setChallenges] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  useEffect(() => {
    fetchChallenges();
  }, [communityId]);

  const fetchChallenges = async () => {
    try {
      const { data, error } = await supabase
        .from('challenges')
        .select(`
          *,
          challenge_participants!inner (
            count,
            status
          )
        `)
        .eq('community_id', communityId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setChallenges(data || []);
    } catch (error) {
      console.error('Error fetching challenges:', error);
    } finally {
      setLoading(false);
    }
  };

  const joinChallenge = async (challengeId) => {
    try {
      const { data: existing, error: checkError } = await supabase
        .from('challenge_participants')
        .select('*')
        .eq('challenge_id', challengeId)
        .eq('user_id', '4b24440e-e77c-4a27-a1a7-7f2f6a4c4c4c')
        .single();

      if (checkError && checkError.code !== 'PGRST116') {
        throw checkError;
      }

      if (existing) {
        alert('You have already joined this challenge!');
        return;
      }

      const { error } = await supabase
        .from('challenge_participants')
        .insert({
          challenge_id: challengeId,
          user_id: '4b24440e-e77c-4a27-a1a7-7f2f6a4c4c4c',
          status: 'Joined'
        });

      if (error) throw error;
      alert('Successfully joined the challenge!');
      fetchChallenges();
    } catch (error) {
      console.error('Error joining challenge:', error);
      alert('Error joining challenge: ' + error.message);
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty.toLowerCase()) {
      case 'easy': return 'bg-green-100 text-green-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'hard': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Challenges</h2>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="px-4 py-2 bg-indigo-500 text-white rounded-lg hover:bg-indigo-600 transition-colors"
        >
          Create Challenge
        </button>
      </div>

      {loading ? (
        <div className="flex items-center justify-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-500"></div>
        </div>
      ) : (
        <div className="grid gap-6">
          {challenges.map((challenge) => (
            <div
              key={challenge.id}
              className="bg-white rounded-lg shadow-md p-6 space-y-4"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-xl font-bold text-gray-800">
                    {challenge.title}
                  </h3>
                  <p className="text-gray-600 mt-2">{challenge.description}</p>
                </div>
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(challenge.difficulty)}`}>
                  {challenge.difficulty}
                </span>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">
                    {challenge.challenge_participants?.count || 0} participants
                  </span>
                  <span className="text-sm text-gray-500">
                    {challenge.points} points
                  </span>
                </div>
                <button
                  onClick={() => joinChallenge(challenge.id)}
                  className="px-4 py-2 bg-indigo-500 text-white rounded-full hover:bg-indigo-600 text-sm"
                >
                  Join Challenge
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <CreateChallengeModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        onSuccess={fetchChallenges}
        communityId={communityId}
      />
    </div>
  );
};

export default Channel;
