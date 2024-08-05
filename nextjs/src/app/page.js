"use client";
import React from "react";
import {
  Container,
  Box,
  Typography,
  Button,
  AppBar,
  Toolbar,
  IconButton,
} from "@mui/material";
import Carousel from "react-material-ui-carousel";
import MenuIcon from "@mui/icons-material/Menu";
import Image from "next/image";
import ProductPage from "./Products/page";

import Link from "next/link";
const items = [
  {
    id: "1",
    name: "First Slide",
    description: "This is the first slide",
    img: "/images/Slide1.jpeg",
  },
  {
    id: "2",
    name: "Second Slide",
    description: "This is the second slide",
    img: "/images/Slide2.jpeg",
  },
  {
    id: "3",
    name: "Third Slide",
    description: "This is the third slide",
    img: "/images/Slide3.jpeg",
  },
];

export default function Home() {
  return (
    <div>
      <Container>
        <Box my={4}>
          <Typography variant="h3" align="center" gutterBottom>
            Welcome!!!
          </Typography>
          <Carousel>
            {items.map((item, i) => (
              <Box key={i} textAlign="center">
                <Image
                  src={item.img}
                  width="864"
                  height="464"
                  alt={item.name}
                  // style={{ width: "80%", height: "auto" }}
                />
                {/* <Typography variant="h5" gutterBottom>
                  {item.name}
                </Typography>
                <Typography variant="body1">{item.description}</Typography> */}
              </Box>
            ))}
          </Carousel>
        </Box>
<Link href="/products">
<Box my={4}>
          <Typography variant="h4" gutterBottom>
            Products
          </Typography>
          {items.map((item) => (
            <ProductPage  
              key={item.id}
              name={item.name}
              description={item.description}
              image={item.image}
            />
          ))}
           <ProductPage/>
 
        </Box></Link>
      </Container>
    </div>
  );
}
