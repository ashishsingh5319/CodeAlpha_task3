import React, { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import '../Component/Inventory.css';
import { data } from './Data';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Button from 'react-bootstrap/Button';
import { format } from 'date-fns';
import logo from './Assests/book.png';
import { Link, useNavigate } from 'react-router-dom';


function Inventory() {
  const [comp_name, setComp_name] = useState('');
  const [qty, setQty] = useState('');
  const [dateofissue, setDateofissue] = useState(null);
  const [dateofreturn, setDateofreturn] = useState(null);
  const [name, setName] = useState('');
  const [status, setStatus] = useState('');
  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState('');
  const [editIndex, setEditIndex] = useState(-1);
  const [currentPage, setCurrentPage] = useState(1);

  const navigate = useNavigate();  

  const recordsPerPage = 20;

  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const filteredData = data.filter((item) =>
    search.toLowerCase() === ''
      ? item
      : item.title.toLowerCase().includes(search.toLowerCase())
  );
  const currentRecords = filteredData.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(filteredData.length / recordsPerPage);
  const pageNumbers = [...Array(totalPages + 1).keys()].slice(1);

  const handleQuantityChange = (e) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity >= 0) {
      setQty(newQuantity);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login', { replace: true });
  };

  const handleDateofissueChange = (date) => {
    setDateofissue(date);
    setDateofreturn(null);
  };

  const handleDateofreturnChange = (date) => {
    setDateofreturn(date);
  };

  const handleStatusChange = (event) => {
    setStatus(event.target.value);
  };

  const resetForm = () => {
    setComp_name('');
    setQty('');
    setDateofissue(null);
    setDateofreturn(null);
    setName('');
    setStatus('');
    setEditIndex(-1);
  };

  const addEntry = () => {
    if (!comp_name.trim() || !qty || !dateofissue || !dateofreturn || !name.trim() || !status) {
      alert("Please fill in all fields.");
      return;
    }

    if (dateofreturn <= dateofissue) {
      alert("Date of return should be after date of issue.");
      return;
    }

    const newEntry = {
      comp_name,
      qty,
      dateofissue: dateofissue.toISOString().split('T')[0],
      dateofreturn: dateofreturn.toISOString().split('T')[0],
      name,
      status
    };

    const updatedUsers = editIndex !== -1
      ? users.map((user, index) => index === editIndex ? newEntry : user)
      : [...users, newEntry];

    setUsers(updatedUsers);
    localStorage.setItem('inventoryData', JSON.stringify(updatedUsers));

    resetForm(); 
  };

  const editEntry = (index) => {
    const selectedEntry = users[index];
    setComp_name(selectedEntry.comp_name);
    setQty(selectedEntry.qty);
    setDateofissue(new Date(selectedEntry.dateofissue));
    setDateofreturn(new Date(selectedEntry.dateofreturn));
    setName(selectedEntry.name);
    setStatus(selectedEntry.status);
    setEditIndex(index);
  };

  const deleteEntry = (index) => {
    const updatedUsers = users.filter((_, i) => i !== index);
    setUsers(updatedUsers);
    localStorage.setItem('inventoryData', JSON.stringify(updatedUsers));
  };

  useEffect(() => {
    const storedData = localStorage.getItem('inventoryData');
    if (storedData) {
      setUsers(JSON.parse(storedData));
    }
  }, []);

  const changePage = (e, pageNumber) => {
    e.preventDefault();  
    setCurrentPage(pageNumber);
  };

  const prePage = (e) => {
    e.preventDefault();  
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextPage = (e) => {
    e.preventDefault();  
    if (currentPage !== totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <div className="container-fluid text-center">
      <div className="img-h1">
        <img src={logo} alt="robosoc" />
        <h1>Book Management System</h1>
      </div>

      <Link to="/login" className="logout-button" onClick={handleLogout}>
        Logout
      </Link>
      <div className="row">
        <div className="col-sm-8">
          <Table>
            <thead>
              <tr>
                <th>Book Name</th>
                <th>Quantity</th>
                <th>Date of Issue</th>
                <th>Date of Return</th>
                <th>Person Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Book Name"
                    value={comp_name}
                    onChange={(event) => setComp_name(event.target.value)}
                    required
                  />
                </td>
                <td>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter Qty"
                    value={qty}
                    onChange={handleQuantityChange}
                    required
                  />
                </td>
                <td>
                  <DatePicker
                    selected={dateofissue}
                    onChange={handleDateofissueChange}
                    dateFormat="dd-MM-yyyy"
                    className="form-control"
                    placeholderText="Select Date"
                    maxDate={new Date()}
                    required
                  />
                </td>
                <td>
                  <DatePicker
                    selected={dateofreturn}
                    onChange={handleDateofreturnChange}
                    dateFormat="dd-MM-yyyy"
                    className="form-control"
                    placeholderText="Select Date"
                    minDate={dateofissue || new Date()}
                    required
                  />
                </td>
                <td>
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Name"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    required
                  />
                </td>
                <td>
                  <label>
                    Returned
                    <input
                      type="radio"
                      value="Returned"
                      checked={status === "Returned"}
                      onChange={handleStatusChange}
                      className="form-check-input mx-2"
                    />
                  </label>
                  <label>
                    Not Returned
                    <input
                      type="radio"
                      value="Not Returned"
                      checked={status === "Not Returned"}
                      onChange={handleStatusChange}
                      className="form-check-input mx-2"
                    />
                  </label>
                </td>
              </tr>
            </tbody>
            {editIndex !== -1 ? (
              <Button
                className="btn btn-primary"
                type="button"
                onClick={addEntry}
              >
                Update
              </Button>
            ) : (
              <Button
                variant="outline-success"
                className="btn btn-success"
                type="button"
                onClick={addEntry}
              >
                Add
              </Button>
            )}
          </Table>
          <h2>Books</h2>
          <Table>
            <thead>
              <tr>
                <th>Books Name</th>
                <th>Quantity</th>
                <th>Date of Issue</th>
                <th>Date of Return</th>
                <th>Person Name</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {users.map((row, index) => (
                <tr key={index}>
                  <td>{row.comp_name}</td>
                  <td>{row.qty}</td>
                  <td>{format(new Date(row.dateofissue), 'dd-MM-yyyy')}</td>
                  <td>{format(new Date(row.dateofreturn), 'dd-MM-yyyy')}</td>
                  <td>{row.name}</td>
                  <td>{row.status}</td>
                  <td>
                    <Button
                      className="btn btn-info btn-sm mr-2"
                      onClick={() => editEntry(index)}
                    >
                      Edit
                    </Button>
                    <Button
                      className="btn btn-danger btn-sm"
                      onClick={() => deleteEntry(index)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))} 
            </tbody>
          </Table>
        </div>
        <div>
          <Container>
            <h1 className="text-center mt-4">Books Data</h1>
            <Form>
              <InputGroup className="my-3">
                <Form.Control
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search components"
                />
              </InputGroup>
            </Form>
            <Table striped bordered hover className="table-2">
              <thead>
                <tr>
                  <th>Author</th>
                  <th>Country</th>
                  {/* <th>Image link</th> */}
                  <th>Language</th>
                  {/* <th>Link</th> */}
                  <th>Pages</th>
                  <th>Book Name</th>
                  <th>Year</th>
                </tr>
              </thead>
              <tbody>
                {currentRecords.map((item, index) => (
                  <tr key={index}>
                    <td>{item.author}</td>
                    <td>{item.country}</td>
                    {/* <td>{item.imageLink}</td> */}
                    <td>{item.language}</td>
                    {/* <td>{item.link}</td> */}
                    <td>{item.pages}</td>
                    <td>{item.title}</td>
                    <td>{item.year}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
            <nav>
              <ul className="pagination">
                <div className="page-item">
                  <a href=" " className="page-link" onClick={prePage}>
                    Prev
                  </a>
                </div>
                {pageNumbers.map((n) => (
                  <div
                    className={`page-item ${currentPage === n ? "active" : ""}`}
                    key={n}
                  >
                    <a
                      href=" "
                      className="page-link"
                      onClick={(e) => changePage(e, n)}
                    >
                      {n}
                    </a>
                  </div>
                ))}
                <div className="page-item">
                  <a href=" " className="page-link" onClick={nextPage}>
                    Next
                  </a>
                </div>
              </ul>
            </nav>
          </Container>
        </div>
      </div>
    </div>
  );
}

export default Inventory;
