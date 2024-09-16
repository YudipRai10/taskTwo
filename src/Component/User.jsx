import React, { useEffect, useState } from "react";

function User() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        " https://jsonplaceholder.typicode.com/users"
      );
      const data = await response.json();

      if (data && data.length > 0) {
        setUsers(data);
      }
    } catch (error) {
      setErrorMsg(error.message);
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <dir>Please Wait! Loading...</dir>;
  if (errorMsg !== null) return <div>Error Occurred! {errorMsg}</div>;

  return (
    <div>
      <div>
        {users && users.length > 0 ? (
          users.map((user) => {
            return (
              <div key={user.id}>
                {user.id}. {user.name}
              </div>
            );
          })
        ) : (
          <div>No Data Found! API FAIL!</div>
        )}
      </div>
    </div>
  );
}

export default User;
