import { useReward } from "react-rewards";

export default function useRandomReward() {
  const { reward, isAnimating } =
    useReward("confettiReward", "confetti");
  
    //const {reward: balloonsReward, isAnimating: isBalloonsAnimating} = useReward('balloonsReward', 'balloons');

  return {
    reward,
    isAnimating
  };
};
