import React from "react";
import Navbar from "./navbar"
import Jumbotron from "./jumbotron";
import Card from "./card";
import Footer from "./footer";

const Home = () => {
	return (
		<div className="text-center">
			<Navbar />
			<Jumbotron />
			<div className="container">
				<div className="row">
					<div className="col-md-3">
						<Card />
					</div>
					
					<div className="col-md-3">
						<Card />
					</div>
					<div className="col-md-3">
						<Card />
					</div>
					<div className="col-md-3">
						<Card />
					</div>
				</div>
			</div>
			<div className="card">

				<div className="card-body" bg-secondary>
					
					<Footer />
				</div>
			</div>
		</div>
	)};


export default Home;