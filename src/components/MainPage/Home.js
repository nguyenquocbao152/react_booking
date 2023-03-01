import React from "react";
import CarouselVehicle from "../../pages/Carousel/Carousel";
import SearchTrip from "../Search/SearchTrip";
import SpecialTrip from "../TripList/SpecialTrip";
import Content from "./Content";
import "./Home.css";

export default function HomeUser() {
  return (
    <main className="container-fluid p-0">
      <CarouselVehicle></CarouselVehicle>
      <SearchTrip></SearchTrip>
      <SpecialTrip></SpecialTrip>
      <Content></Content>
    </main>
  );
}
