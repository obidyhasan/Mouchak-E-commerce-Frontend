import { Button } from "@/components/ui/button";
import config from "@/config";
import { FaGoogle } from "react-icons/fa";

const GoogleAuthentication = () => {
  return (
    <div>
      <Button
        onClick={() => window.open(`${config.baseUrl}/auth/google`)}
        variant="outline"
        className="w-full"
      >
        <FaGoogle
          className="me-1 dark:text-white/60"
          size={16}
          aria-hidden="true"
        />
        Login with Google
      </Button>
    </div>
  );
};

export default GoogleAuthentication;
