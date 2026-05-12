import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom'
import { loginUser } from '../services/auth.services';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
    const { user, setUser, login, isAdmin } = useAuth();
    const [data,setData] = useState({
        email: "",
        password: ""
    })
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();
    

    const onChangeHandler = (e) => {
        setData({...data, [e.target.name] : e.target.value})
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await login(data);
            setUser(res.data.user);
        } catch (err) {
            console.error(err);
            setError(err?.response?.data?.message || "Login failed");
        } finally {
            setLoading(false);
        }
    };

    return (

    <div className="h-screen flex items-center justify-center bg-muted/30">

      <div className="w-full max-w-md p-8 rounded-2xl border bg-background shadow-sm">

        {/* Header */}
        <div className="text-center mb-6">
          <h1 className="text-2xl font-semibold">Welcome Back</h1>
          <p className="text-sm text-muted-foreground">
            Login to continue
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleLogin} className="space-y-4">

          {/* Email */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              name="email"
              value={data.email}
              onChange={onChangeHandler} 
              className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Password */}
          <div className="space-y-1">
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              name="password"
              value={data.password}
              onChange={onChangeHandler}
              className="w-full border rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Button */}
            <button
                type="submit"
                disabled={!data.email || !data.password || loading}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white py-2 rounded-lg text-sm font-medium transition"
                >
                {loading ? "Logging in..." : "Login"}
            </button>

        </form>

        {error && <p className="text-red-500 text-sm">{error}</p>}

        {/* Footer */}
        <p className="text-center text-xs text-muted-foreground mt-4">
          Don’t have an account?{" "}
          <Link to="/signup">
            <span className="text-blue-500 cursor-pointer hover:underline">
            Sign up
          </span>
          </Link>
        </p>

      </div>
    </div>
  );
     
};

export default LoginPage;