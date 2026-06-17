import { Button } from "antd";
import { useNavigate } from "react-router-dom";


const NotFoundPage = () => {
    const navigate = useNavigate();

    return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center">
      <h1 className="text-7xl font-bold text-green-700">404</h1>
      <p className="text-xl text-gray-600">Oops! Not Found.</p>
      <Button
        type="primary"
        className="mt-4 bg-green-800 hover:bg-green-700 text-white"
        onClick={() => navigate("/dashboard")}
      >
        Go Home
      </Button>
    </div>
    )

}

export default NotFoundPage;