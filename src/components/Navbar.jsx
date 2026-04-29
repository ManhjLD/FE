import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();

  return (
    <nav className="flex justify-between p-4 bg-white shadow">

      <div className="font-bold text-primary">
        Vietnam Airways
      </div>

      <div className="flex items-center gap-3">

        {!isAuthenticated ? (
          <>
            <button>Đăng ký</button>
            <button className="bg-primary text-white px-4 py-2 rounded">
              Đăng nhập
            </button>
          </>
        ) : (
          <div className="flex items-center gap-2">
            <img
              src={user?.avatar}
              className="w-8 h-8 rounded-full"
            />
            <span>{user?.name}</span>
            <button onClick={logout} className="text-red-500">
              Logout
            </button>
          </div>
        )}

      </div>
    </nav>
  );
};

export default Navbar;