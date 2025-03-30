import React from "react";
import { Link } from "react-router-dom";
import { Box, Button } from "@mui/material";

function NavBar() {
  return (
    <Box
      component="nav"
      sx={{
        position: "fixed", // Fixa o NavBar no topo
        top: 0,
        left: 0,
        right: 0,
        width: "100%",
        display: "flex",
        justifyContent: "space-around",
        alignItems: "center",
        padding: "10px 10px",
        backgroundColor: "rgba(255, 255, 255, 0.8)", // Fundo translúcido
        boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.2)", // Sombra discreta
        zIndex: 1000, // Garante que o NavBar fique acima do conteúdo
      }}
    >
      <Button
        component={Link}
        to="/"
        variant="outlined"
        sx={{
          flexGrow: 1,
          textTransform: "none",
          color: "#333",
          borderColor: "#333",
          fontWeight: "bold",
          fontSize: "14px",
          margin: "0 10px",
          backgroundColor: "white",
          "&:hover": {
            backgroundColor: "#f5f5f5",
          },
        }}
      >
        Inicial
      </Button>
      <Button
        component={Link}
        to="/sobre"
        variant="outlined"
        sx={{
            flexGrow: 1,
          textTransform: "none",
          color: "#333",
          borderColor: "#333",
          fontWeight: "bold",
          fontSize: "14px",
          margin: "0 10px",
          backgroundColor: "white",
          "&:hover": {
            backgroundColor: "#f5f5f5",
          },
        }}
      >
        Sobre
      </Button>
      <Button
        component={Link}
        to="/lista-de-livros"
        variant="outlined"
        sx={{
            flexGrow: 1,
          textTransform: "none",
          color: "#333",
          borderColor: "#333",
          fontWeight: "bold",
          fontSize: "14px",
          margin: "0 10px",
          backgroundColor: "white",
          "&:hover": {
            backgroundColor: "#f5f5f5",
          },
        }}
      >
        Lista
      </Button>
      <Button
        component={Link}
        to="/cadastro-de-livros"
        variant="outlined"
        sx={{
            flexGrow: 1,
          textTransform: "none",
          color: "#333",
          borderColor: "#333",
          fontWeight: "bold",
          fontSize: "14px",
          margin: "0px 10px",
          backgroundColor: "white",
          "&:hover": {
            backgroundColor: "#f5f5f5",
          },
        }}
      >
        Cadastro
      </Button>
    </Box>
  );
}

export default NavBar;








/*import React from "react";
import { Link } from 'react-router-dom';
//import './NavBar.css';

function NavBar(props){

    return(
        
        <nav>
            <ul>
                <li><Link to="/">Página Inicial</Link></li>
                <li><Link to="/sobre">Sobre</Link></li>
                <li><Link to="/lista-de-livros">Lista de Livros</Link></li>
                <li><Link to="/cadastro-de-livros">Cadastro de Livros</Link></li>
            </ul>
        </nav>
        
        
        
    )
}

export default NavBar*/