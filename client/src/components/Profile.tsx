import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { Heart, Calendar, Clock, Star, Trophy, Gift, MessageCircle } from 'lucide-react';
import { useUser } from '../contexts/UserContext';

const ProfileContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 2rem 1rem 6rem 1rem;
  color: white;
`;

const Header = styled(motion.div)`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
`;

const Subtitle = styled.p`
  font-size: 1.1rem;
  opacity: 0.9;
`;

const ProfileCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border-radius: 20px;
  padding: 2rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.2);
`;

const AvatarSection = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

const Avatar = styled.div`
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: linear-gradient(45deg, #ff6b6b, #ee5a24);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 2rem;
  font-weight: bold;
  color: white;
`;

const UserInfo = styled.div`
  flex: 1;
`;

const UserName = styled.h2`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

const UserDescription = styled.p`
  font-size: 1rem;
  opacity: 0.8;
  line-height: 1.5;
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const StatCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 1.5rem;
  text-align: center;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const StatIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: #ffd700;
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.25rem;
`;

const StatLabel = styled.div`
  font-size: 0.9rem;
  opacity: 0.8;
`;

const RelationshipSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 1.5rem;
  margin-bottom: 2rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const RelationshipTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 10px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 5px;
  overflow: hidden;
  margin-bottom: 1rem;
`;

const ProgressFill = styled(motion.div)<{ progress: number }>`
  height: 100%;
  background: linear-gradient(45deg, #ff6b6b, #ee5a24);
  width: ${props => props.progress}%;
  border-radius: 5px;
`;

const RelationshipInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.9rem;
  opacity: 0.8;
`;

const AchievementsSection = styled.div`
  background: rgba(255, 255, 255, 0.1);
  border-radius: 15px;
  padding: 1.5rem;
  border: 1px solid rgba(255, 255, 255, 0.1);
`;

const AchievementsTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const AchievementsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
  gap: 1rem;
`;

const AchievementCard = styled(motion.div)<{ unlocked: boolean }>`
  background: ${props => props.unlocked ? 'rgba(255, 215, 0, 0.2)' : 'rgba(255, 255, 255, 0.05)'};
  border: 2px solid ${props => props.unlocked ? '#ffd700' : 'rgba(255, 255, 255, 0.1)'};
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
  opacity: ${props => props.unlocked ? 1 : 0.5};
`;

const AchievementIcon = styled.div`
  font-size: 2rem;
  margin-bottom: 0.5rem;
  color: ${props => props.unlocked ? '#ffd700' : '#666'};
`;

const AchievementName = styled.div`
  font-size: 0.9rem;
  font-weight: 600;
  margin-bottom: 0.25rem;
`;

const AchievementDesc = styled.div`
  font-size: 0.8rem;
  opacity: 0.8;
`;

const Profile: React.FC = () => {
  const { user, personality } = useUser();
  const [relationshipProgress, setRelationshipProgress] = useState(25);

  if (!user || !personality) {
    return (
      <ProfileContainer>
        <Header>
          <Title>Carregando perfil...</Title>
        </Header>
      </ProfileContainer>
    );
  }

  const relationshipLevels = {
    1: { name: 'Conhecidos', intimacy: 0.1 },
    2: { name: 'Amigos', intimacy: 0.3 },
    3: { name: 'Próximos', intimacy: 0.5 },
    4: { name: 'Íntimos', intimacy: 0.7 },
    5: { name: 'Namorados', intimacy: 0.9 }
  };

  const currentLevel = relationshipLevels[user.relationshipLevel as keyof typeof relationshipLevels];
  const progressPercentage = (currentLevel.intimacy * 100);

  const achievements = [
    {
      id: 1,
      name: 'Primeira Conversa',
      description: 'Iniciou o relacionamento',
      icon: <MessageCircle />,
      unlocked: true
    },
    {
      id: 2,
      name: 'Amizade',
      description: 'Nível 2 alcançado',
      icon: <Heart />,
      unlocked: user.relationshipLevel >= 2
    },
    {
      id: 3,
      name: 'Intimidade',
      description: 'Nível 3 alcançado',
      icon: <Star />,
      unlocked: user.relationshipLevel >= 3
    },
    {
      id: 4,
      name: 'Namorados',
      description: 'Nível 5 alcançado',
      icon: <Trophy />,
      unlocked: user.relationshipLevel >= 5
    }
  ];

  const stats = [
    {
      icon: <MessageCircle />,
      value: '15',
      label: 'Conversas'
    },
    {
      icon: <Calendar />,
      value: '7',
      label: 'Dias Juntos'
    },
    {
      icon: <Clock />,
      value: '2h',
      label: 'Tempo Total'
    },
    {
      icon: <Gift />,
      value: '3',
      label: 'Presentes'
    }
  ];

  return (
    <ProfileContainer>
      <Header
        initial={{ y: -50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Title>💕 Nosso Perfil</Title>
        <Subtitle>Conheça mais sobre nosso relacionamento</Subtitle>
      </Header>

      <ProfileCard
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <AvatarSection>
          <Avatar>
            {personality.name.charAt(0)}
          </Avatar>
          <UserInfo>
            <UserName>{personality.name}</UserName>
            <UserDescription>
              {personality.description}. {personality.traits.join(', ')}.
            </UserDescription>
          </UserInfo>
        </AvatarSection>

        <StatsGrid>
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <StatIcon>{stat.icon}</StatIcon>
              <StatValue>{stat.value}</StatValue>
              <StatLabel>{stat.label}</StatLabel>
            </StatCard>
          ))}
        </StatsGrid>
      </ProfileCard>

      <RelationshipSection
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.4 }}
      >
        <RelationshipTitle>
          <Heart />
          Nível de Relacionamento
        </RelationshipTitle>
        
        <ProgressBar>
          <ProgressFill 
            progress={progressPercentage}
            initial={{ width: 0 }}
            animate={{ width: progressPercentage }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        </ProgressBar>
        
        <RelationshipInfo>
          <span>{currentLevel.name}</span>
          <span>{Math.round(progressPercentage)}% de intimidade</span>
        </RelationshipInfo>
      </RelationshipSection>

      <AchievementsSection
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.6 }}
      >
        <AchievementsTitle>
          <Trophy />
          Conquistas
        </AchievementsTitle>
        
        <AchievementsGrid>
          {achievements.map((achievement, index) => (
            <AchievementCard
              key={achievement.id}
              unlocked={achievement.unlocked}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.7 + index * 0.1 }}
              whileHover={{ scale: 1.05 }}
            >
              <AchievementIcon unlocked={achievement.unlocked}>
                {achievement.icon}
              </AchievementIcon>
              <AchievementName>{achievement.name}</AchievementName>
              <AchievementDesc>{achievement.description}</AchievementDesc>
            </AchievementCard>
          ))}
        </AchievementsGrid>
      </AchievementsSection>
    </ProfileContainer>
  );
};

export default Profile; 