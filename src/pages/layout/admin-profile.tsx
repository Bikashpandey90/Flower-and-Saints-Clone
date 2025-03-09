import { useContext, useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Pencil, User, ShieldCheck, Calendar, MapPin, Phone, Settings, Users, BarChart, Database, Globe } from "lucide-react";
import { AuthContext } from "@/context/auth-context";

const AdminProfile = () => {
  const [editMode, setEditMode] = useState(false);
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "admin@example.com",
    role: "Administrator",
    phone: "+123 456 7890",
    address: "123 Admin St, Admin City, AC 10001",
    joinedDate: "January 10, 2020",
    securityLevel: "High"
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };
    const auth = useContext(AuthContext) as { loggedInUser: any }
  

  return (
    <div className="p-1 max-w-8xl ">
      <motion.div
        className="bg-white shadow-xl rounded-2xl p-8"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row items-center space-x-0 md:space-x-6">
          {
            auth.loggedInUser && auth.loggedInUser.image ?<img className="w-24 h-24 rounded-full object-cover text-gray-500" src={auth.loggedInUser.image} alt="User"/>: <User className="w-24 h-24 text-gray-500" />
          }
          <div className="flex-1 w-full text-center md:text-left">
            {editMode ? (
              <Input name="name" value={auth.loggedInUser.name} onChange={handleChange} className="mb-2" />
            ) : (
              <h2 className="text-3xl font-semibold">{auth.loggedInUser.name}</h2>
            )}
            <p className="text-gray-600 flex items-center  "><ShieldCheck className="w-5 h-5 mr-2" /> {auth.loggedInUser.role==='admin'?"Administrator":"Undefined role"}</p>
            {editMode ? (
              <Input name="email" value={auth.loggedInUser.email} onChange={handleChange} className="mt-2" />
            ) : (
              <p className="text-gray-500">{auth.loggedInUser.email}</p>
            )}
          </div>
          <Button className="mt-4 md:mt-0" onClick={() => setEditMode(!editMode)}>
            <Pencil className="w-4 h-4 mr-2" /> {editMode ? "Save" : "Edit"}
          </Button>
        </div>
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-100 p-4 rounded-xl">
            <p className="text-gray-600 flex items-center"><Phone className="w-5 h-5 mr-2" /> Phone</p>
            {editMode ? (
              <Input name="phone" value={auth.loggedInUser.phone} onChange={handleChange} />
            ) : (
              <p className="text-gray-700 font-medium">{auth.loggedInUser.phone?auth.loggedInUser.phone:profile.phone}</p>
            )}
          </div>
          <div className="bg-gray-100 p-4 rounded-xl">
            <p className="text-gray-600 flex items-center"><MapPin className="w-5 h-5 mr-2" /> Address</p>
            {editMode ? (
              <Input name="address" value={auth.loggedInUser.address} onChange={handleChange} />
            ) : (
              <p className="text-gray-700 font-medium">{auth.loggedInUser.address?auth.loggedInUser.address:profile.address}</p>
            )}
          </div>
          <div className="bg-gray-100 p-4 rounded-xl">
            <p className="text-gray-600 flex items-center"><Calendar className="w-5 h-5 mr-2" /> Joined Date</p>
            <p className="text-gray-700 font-medium">{profile.joinedDate}</p>
          </div>
          <div className="bg-gray-100 p-4 rounded-xl">
            <p className="text-gray-600 flex items-center"><ShieldCheck className="w-5 h-5 mr-2" /> Security Level</p>
            <p className="text-gray-700 font-medium">{profile.securityLevel}</p>
          </div>
        </div>
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-blue-100 p-4 rounded-xl flex items-center">
            <Users className="w-6 h-6 text-blue-600 mr-3" />
            <p className="text-blue-700 font-medium">Manage Users</p>
          </div>
          <div className="bg-green-100 p-4 rounded-xl flex items-center">
            <Settings className="w-6 h-6 text-green-600 mr-3" />
            <p className="text-green-700 font-medium">App Settings</p>
          </div>
          <div className="bg-yellow-100 p-4 rounded-xl flex items-center">
            <BarChart className="w-6 h-6 text-yellow-600 mr-3" />
            <p className="text-yellow-700 font-medium">Analytics & Reports</p>
          </div>
          <div className="bg-red-100 p-4 rounded-xl flex items-center">
            <Database className="w-6 h-6 text-red-600 mr-3" />
            <p className="text-red-700 font-medium">Database Management</p>
          </div>
          <div className="bg-purple-100 p-4 rounded-xl flex items-center">
            <Globe className="w-6 h-6 text-purple-600 mr-3" />
            <p className="text-purple-700 font-medium">Global Controls</p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default AdminProfile;
