"use client";

import TextField from "@mui/material/TextField";
import { ButtonBase, MenuItem, Typography } from "@mui/material";
import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  Card,
  CardContent,
  CardActions,
  Button,
} from "@mui/material";
import axios from "axios";
import { useRouter } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Image from "next/image";

export default function Homepage() {
  const router = useRouter();
  const types = [
    "micro",
    "nano",
    "regional",
    "brewpub",
    "large",
    "planning",
    "bar",
    "contract",
    "propietor",
    "closed",
  ];

  const [name, setName] = useState("");
  const [city, setCity] = useState("");
  const [breweryType, setBreweryType] = useState("");
  const [results, setResults] = useState([]);

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleRowsPerPageChange = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleApiCall = () => {
    const params = {};

    if (name) {
      params.by_name = name;
    }

    if (city) {
      params.by_city = city;
    }

    if (breweryType) {
      params.by_type = breweryType;
    }
    axios
      .get(`https://api.openbrewerydb.org/v1/breweries`, {
        params,
      })
      .then((response) => {
        setResults(response.data);
        console.group(results);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <>
      <Navbar />
      <div className="flex justify-around h-screen" 
        style={
        {
          position: "relative",
          overflow: "auto",
          backgroundImage: "url('data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBw0NDQ0NDQ0IDQ0ICA0HBwcHCA8IDQcNFREWFhURExMZHigsGCYxGx8TLT0tMTU3OjoxFx85RD8tNyg5LisBCgoKDQ0NDw0NDzcZFRktKzctLTcrLTcrKysrNzcrKy0tKys3KysrLSstKysrKysrLSsrLSsrKysrKysrKysrK//AABEIAOkA2AMBIgACEQEDEQH/xAAbAAEBAQEBAQEBAAAAAAAAAAACAQAFBgQDB//EADMQAAIDAAECBQICCQUBAAAAAAABAgMRBBIhBRMxUZEGIhRBIzJhYnGBocHRM0Kx4fAV/8QAGwEAAwEBAQEBAAAAAAAAAAAAAQIEAwAGBwX/xAAlEQEBAQABAgYDAQEBAAAAAAAAAgERoeEGEhNTYWIUFVREFgX/2gAMAwEAAhEDEQA/AP6mYxUfJsl+mxTFw2mQZIpTYbTJWLhTYa5AcsYuFw1yA5QxcLg+Q7kTCMHyByJhGw7yDyGGwRsF2HciTBYTDPYHkSDJhlUjyDRBhaMakRIIjMakUMYplwLFMVFEyCpFMVG8yVkimLhvMg2FSKkXDeYLymFLhcNcgORwuFwuGmQHI4bBYbBvI7kcNgsNgPI7kMNgsJgmwPI4RoeEwzqB5DCDDhjUCLIIjRhUiLQRhZPUmExTGW4KpCIVFEyVUVGKiiJBkJGKkUzJd1ioqKkbzBeUwuFwuG8wHKYXCmw1yA5TDYLDYN5A5HDYLCA2HcjhMHhME2B5DCYPCNGNQPINEYwtGFSYGiMbCyepNgsIyMmqRwGjFMYbhlKZFRRGF1UJEQkVRJdZCREJFMSXWQkZIqKpkrFSMkI3mA5TDFwuG2QXlDCww3kdyJMHhMBsO5HCYIhnUDyIWNohjUCDIJojJrkwMjEyMmuTYDCNhZLeGwTFZifcMpURCRRGF1UJBQkVRhdVCREJFcYXVRUjIqKokuqXDIpTMl3WKbCm2SVDYIxp5HDhhEwXYcJGhEM6keRC0NkJ6kwBY2FktyYGRiZGS3JgYWNhZJeGwTGZibcMyEiCRvGBqoSIhIrjCaqEiIqLIwukioiEiuMJqoqMiopnCsUwiiZBMNhSmmSA4QRmDZcIWIjMakRCxhZNeGwWETCyS8PgsLGwskvDYDCxsLI7w2AUxibcMyEgoSNYDSQkFCRZBdJCQUJFkE0kVEQkVwXVQgoSK4KqKRCRROFYpjG2YCGKRiVjhZCsjMKMLIVkZNZsFhYmFkdmwWFiYWSWfBYWJhZHZsFmMzEumZCQUJGkBpISAhorgukhIKKiyNJpoSAhIrjS6QkEqKo0pIoRaUzpVKQxrlAxjEYu65GQxGYVpkZGULJr02IwsrCSXpsRhYmFkdnwWFiYWR2bBZjGJt0yISChIaNdpISCioqjS6aEgISLI0mmioKKiqKLpoqCmUqmimYKZTeaKWm0mm0fzOXTEJoNpyhZiGVULBZWQmujIwsrCyW9NiMLKyMkvTYLCxMLJL0+CykZibdMxUFFR0a7TQkBCRVFE0kJAQkVRRdNFQExIqiimVMCYiiaAih02m2WUjaTTaP53cLpiE0G27hSNm0jMqseGCzNkZhVCzCzMjJro2IyMzIyW6NiMLKwslvT4xiMxPuihQiQs0OkhICKimKLpoQCplMUU0xJgRUUTZTLoNLpRNgel0BdNcsvBGDptG87uCJpNJoNt3BaTSaQz2x4XSMmk0xqx4ZkZmFsnujMyGYWye6MzCUjJbo2IYhjDdFEIAkJNCSKEqKJopooCplE0HBpl0Ol03my8FpdDpTbLDgtLoNLpplhwWm0JhvUdwWm0JtO23cLpNJpjPbdw2k02k0yqx4ZshgsxqzcKwmIyeqFmQxGT1RkbMQxhuihQlEmhNFALTeaAkUJUbTReC0ugLptlhwel0Gl01yw4LS6HTGmWHBabQmD53cFptCbTvO7hdNpNJom2PC6TSaQz2x4XSaYJjVDwrZDE0xqh4ZhMYwqjIYhTLaES6dzoj7R+DdEfaPwepzwvX9HTum/I+riaXTtdC9o/Buhe0fgfPDVZ/o6dw/I+rjJl07HQvZfBuhey+B88OV7/Tu71/q5Gl0+6fKqV0Ke3XdTZfBpJx6YOKev3+6IuRfVVHrscIxUowcpLtrkor+rQ+eH69/p3D1/hz9Lp99V9U+tRdb8mzybc/2TxPP+D9Pt/d/oNn/gV73Tu71vhzNLp99V9U+rpcH5VsqLPy6Jr1QOXyq6ejrX+tyK+LBRipNTnLI7/MP6Kve6dw9b4fHptOn9vr9ue/bDfb+729fTsH9FXvdO7vW+HM02nTXS/Tpf8M7H4c3lVUQ67NSclXGNdM752SfpGMIpuT/gjv0Ve907u9b4fFptP24/i3GtnCFTssd1Ub4WUcO62pRktXVYo9Me35NoL8a4SW+fRj568Jj6/fyW0lXHt37uPyD9DXvdO7vW+H56TR2+OcSFkq5vkVyhGU9v8N5NMLFFpPom4ZPu4+je6iR8e4TdaVq26XQoy49kHRLq6Mt2P6J9Xb7s79hd8P17/TuPr/AaTT6K/FuLKu63Zxq4kZTv5PI4lvHq6VuuM5RSmuz9NPtonCyEZw6XC2Eba5qOdcWtT+BN8O17/Tu71/hyWyadroXsvg3QvaPwJvhut/0dO4/kfVxNI2dzoXtH4Ruhe0fgTfDFf0dO4/kfVwinc6F7R+DC/wDLV/T07u/J+pGMY9glYxjHOYNkdi17xa7toRjnPHw+k7HX5c4+HxjVw+Xx+DRFyuXEnNVqubm4Lqa6ZPc3uvV9w3/S/Jsh5c//AJtkOP59nG8+U5PlTs5ML/0icH0fquPbfXf2HsTe5znj+d9KTs6+mrw1Qnzvxr41V8+JHkqVLg4zlGvt0vWuz3X+q+5+3J+mJONzrhwZX3eIR5lHI5M5PyYqmNcXPYvzMak+l+/qn3PVf4/wb/o5zyXK+mbG7uinwiat5nI5PlX9VUeT5sc67EoPJRe567r7xDP6UvlXKmVnHbfIovl45GycObeouDcZfb2zped36/l6v1z/ALFRznA5fhV9lHGrdXhklwJ1zlwp2ThxudkJRaa6H042mu0vT+Zz7fpW6c+/4BRVsrbbo9bs8QjKyEvKsWdoxSaXd72/V/P1y/8AfJUc5wPA/AHxLpWL8PGNi5cJx46cXKM+VKylPt6Rraj+zMXY+7l8OyPHjTx1VZ0fo5VeIci2Pn1tNNeck3F9/XGdH/Jkc55Wv6b5CVNauhQquPGnk+KcDkWQvvSrcPLVUouOLV9zbf2rtvctv0/ya6rKqZca/wAzxbh+IUvm2rhfh6aPw76F5dT7t1Z/DH3fY9SY5zk2cHkOy/kbxXdKuvjcCi2U5VU0xyU4uWanKW90vSMPXDk8X6b5Natgp8NQ8RlB8yLsssfh0Y2ymo1Nr9L2ea879/2HrDHOeYr+nLpSblb+FrhOFnH4Hh9342myyPU1ZNXQ7d2n0pdnFd2dzwjjSo43HpnPzJ8bi18ey3EuuUYpN9kj6zR/sc5TGMc5jGMc5jGMc5//2Q==')", 
          backgroundRepeat: "no-repeat", 
          backgroundSize: "cover", 
          backgroundPosition: "center"
        }
        }
      >
      <div className="flex flex-row justify-left items-start w-full  px-5 py-5">
        <div className="flex flex-col justify-start items-start w-1/7">
          <div style={{ 
              fontFamily: "Calibri",
              marginBottom: "0.5rem" ,
            }}>Enter the Brewery details</div>
          <TextField
            variant="outlined"
            placeholder="Enter Name"
            label="Enter name of the Brewery"
            value={name}
            className="w-full mb-2 px-1"
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            variant="outlined"
            placeholder="Enter City"
            label="Enter City"
            value={city}
            className="w-full mb-4 px-1"
            onChange={(e) => setCity(e.target.value)}
          />
          <TextField
            select
            label="Brewery Type"
            value={breweryType}
            onChange={(e) => setBreweryType(e.target.value)}
            className="w-full mb-4 px-1"
          >
            {types.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
          <Button
            variant="contained"
            size="large"
            onClick={handleApiCall}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 w-full"
          >
            Search
          </Button>
        </div>
  <div className="flex flex-col justify-center items-right w-4/7">
    {results.length > 0 ? (
      <div className="flex flex-col items-center justify-center py-10">
        <TableContainer
          component={Paper}
          sx={{ borderRadius: 2, boxShadow: 4, maxWidth: '90%' }}
        >
          <Table size="small">
            <TableHead sx={{ background: "#E9DB5D" }}>
              <TableRow>
                <TableCell>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Name
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Address
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    City
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    State
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Phone
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Website
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography variant="h6" sx={{ fontWeight: "bold" }}>
                    Action
                  </Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {results
                .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
                .map((row) => (
                  <TableRow key={row.id}>
                    <TableCell>{row.name}</TableCell>
                    <TableCell>
                      {row.address_1}
                      {row.address_2 && ` ${row.address_2}`}
                      {row.address_3 && ` ${row.address_3}`}
                    </TableCell>
                    <TableCell>{row.city}</TableCell>
                    <TableCell>{row.state}</TableCell>
                    <TableCell>{row.phone}</TableCell>
                    <TableCell>
                      <a
                        href={row.website_url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {row.website_url}
                      </a>
                    </TableCell>
                    <TableCell>
                      <Link key={row.id} href={`/breweryinfo/${row.id}`}>
                        <Button type="submit" 
                        variant="contained" 
                        className="px-4 py-2 bg-yellow-300 text-white rounded hover:bg-blue-600"
                        style={{ fontFamily: "Calibri" }}>
                          View info
                        </Button>
                      </Link>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <TablePagination
          component="div"
          count={results.length}
          page={page}
          onPageChange={handleChangePage}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </div>
    ) : (
      <div className="flex flex-col items-center justify-center"
        style={
          {
            marginLeft: '400px',
            marginTop: '200px'
          }
        }
      >
      <Typography >Search by name, city, type for breweries</Typography></div>
    )}
  </div>
</div>

      </div>
    </>
  );
}
