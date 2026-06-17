import { useLoadingStore } from "@/stores";
import { Spin } from "antd";


const LoadingScreen = () => {
  const { loading } = useLoadingStore();

  if (!loading) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-[9999]">
      <Spin size="large" />
    </div>
  );
};

export default LoadingScreen;