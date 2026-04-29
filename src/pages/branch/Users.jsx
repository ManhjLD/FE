function Users() {
  return (
    <div className="p-10">
      <h1 className="text-4xl font-bold text-primary mb-8">
        User tại chi nhánh
      </h1>

      <table className="w-full bg-white shadow rounded-xl overflow-hidden">
        <thead className="bg-primary text-white">
          <tr>
            <th className="p-4 text-left">Tên</th>
            <th>Email</th>
            <th>SĐT</th>
          </tr>
        </thead>

        <tbody>
          <tr className="border-b">
            <td className="p-4">Nguyễn Văn A</td>
            <td>a@gmail.com</td>
            <td>0123456789</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Users;