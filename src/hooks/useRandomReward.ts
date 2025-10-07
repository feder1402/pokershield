import { useReward } from "react-rewards";

/**
 * Hook that exposes a confetti reward trigger and its animation state.
 *
 * @returns An object with `reward` — a callback that triggers the confetti animation, and `isAnimating` — `true` while the animation is running, `false` otherwise.
 */
export default function useRandomReward() {
  const { reward, isAnimating } =
    useReward("confettiReward", "confetti");
  
    //const {reward: balloonsReward, isAnimating: isBalloonsAnimating} = useReward('balloonsReward', 'balloons');

  return {
    reward,
    isAnimating
  };
};