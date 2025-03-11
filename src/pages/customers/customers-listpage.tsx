import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ChevronDown, Search } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import customerSvc from "./customer-servicepage";
import { toast } from "react-toastify";
import Swal from "sweetalert2";

interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  image: string;
  status: string;
}

const CustomerListPage = () => {
  const [users, setUser] = useState<User[] | null>(null);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const loadCustomers = useCallback(async () => {
    try {
      const response = await customerSvc.getAllCustomers();
      setUser(response.data);
    } catch (exception) {
      console.log(exception);
    }
  }, []);

  useEffect(() => {
    loadCustomers();
  }, []);

  const deleteUser = async (id: string) => {
    try {
      let result = await Swal.fire({
        title: 'Are you sure ?',
        text: 'You will not be able to recover this!',
        icon: 'warning',
        confirmButtonColor: "#0E0E0E",
        cancelButtonColor: "#ccc",

        confirmButtonText: "Delete"
      })
      if (result.isConfirmed) {
        await customerSvc.deleteUser(id)
        toast.success("User deleted successfully")
        loadCustomers()
      }

    } catch (exception) {
      console.log(exception)
      toast.error("Error deleting user")
    }
  }
  // Function to truncate email with ellipsis
  const truncateEmail = (email: string, maxLength = 20) => {
    if (email.length <= maxLength) return email

    // Find a good breaking point (@ symbol or dot)
    const atIndex = email.indexOf("@")
    if (atIndex > 0 && atIndex < maxLength - 3) {
      return email.substring(0, atIndex + 1) + "..."
    }

    return email.substring(0, maxLength) + "..."
  }

  return (
    <div className="container mx-auto p-4 space-y-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              Action <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Reward</DropdownMenuItem>
            <DropdownMenuItem>Promote</DropdownMenuItem>
            <DropdownMenuItem>Activate account</DropdownMenuItem>
            <DropdownMenuItem onClick={() => {
              if (selectedUser) {
                deleteUser(selectedUser._id);
              } else {
                toast.error("No user selected");
              }
            }}>Delete User</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-500 h-5 w-5" />
          <Input type="search" placeholder="Search for users" className="pl-10 w-full sm:w-[300px]" />
        </div>
      </div>

      <div className="overflow-x-auto rounded-lg border border-gray-200 dark:border-gray-700">
        <Table className="table-fixed w-full">
          <TableHeader>
            <TableRow>
              <TableHead className="w-[60px]"><input type="checkbox" className="rounded border-gray-300" /></TableHead>
              <TableHead className="w-[200px]">Name</TableHead>
              <TableHead className="w-[150px]">Position</TableHead>
              <TableHead className="w-[150px]">Status</TableHead>
              <TableHead className="w-[120px]">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users && users.map((user, index) => (
              <TableRow key={index}>
                <TableCell className="w-[60px]"><input type="checkbox" className="rounded border-gray-300" onChange={() => {
                  setSelectedUser(user)
                }} /></TableCell>
                <TableCell className="w-[200px]">
                  <div className="flex items-center gap-3">
                    <img
                      src={user.image || "https://upload.wikimedia.org/wikipedia/commons/8/89/Portrait_Placeholder.png"}
                      alt={`${user.name}'s profile`}
                      className="w-14 h-14 rounded-full object-cover "
                    />
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-base text-gray-500 overflow-clip">
                        {truncateEmail(user.email)}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell className="w-[150px]">
                  <div className="flex items-center text-base">
                    {user.role === 'admin' ? 'Administrator' : user.role === 'seller' ? 'Seller' : 'Customer'}
                  </div>
                </TableCell>
                <TableCell className="w-[150px]">
                  <div className="flex items-center">
                    <div className={`h-2.5 w-2.5 rounded-full text-base ${user.status === "active" ? "bg-green-500" : "bg-red-500"} mr-2`}></div>
                    {user.status === 'active' ? "Active" : "Inactive"}
                  </div>
                </TableCell>
                <TableCell className="w-[120px]">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="link">Edit user</Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Edit user</DialogTitle>
                      </DialogHeader>
                      <UserEditForm />
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

const UserEditForm = () => {
  return <form className="space-y-4">{/* Form fields */}</form>;
};

export default CustomerListPage;