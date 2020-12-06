import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";
import PropTypes from "prop-types";

export const AddContact = props => {
	const { actions } = useContext(Context);
	const contact = props.location.state.contact;
	const title = props.location.state.title;
	const [user, setUser] = useState({
		full_name: title == "Update contact" ? contact.full_name : "",
		email: "",
		agenda_slug: "Virginia",
		address: "",
		phone: ""
	});
	const handelChange = event => {
		console.log(user);
		setUser({ ...user, [event.target.name]: event.target.value });
	};
	const handelSubmit = e => {
		e.preventDefault();
		const id = title == "Update contact" ? contact.id : "";
		console.log("estoy en el submit");
		actions.addContact(user, title, id);
	};
	return (
		<div className="container">
			<div>
				<h1 className="text-center mt-5">{title}</h1>
				<form onChange={handelChange} onSubmit={handelSubmit}>
					<div className="form-group">
						<label>Full Name</label>
						<input
							type="text"
							className="form-control"
							defaultValue={title == "Update contact" ? contact.full_name : ""}
							name="full_name"
						/>
					</div>
					<div className="form-group">
						<label>Email</label>
						<input type="email" className="form-control" placeholder="Enter email" name="email" />
					</div>
					<div className="form-group">
						<label>Phone</label>
						<input type="phone" className="form-control" placeholder="Enter phone" name="phone" />
					</div>
					<div className="form-group">
						<label>Address</label>
						<input type="text" className="form-control" placeholder="Enter address" name="address" />
					</div>
					<button type="submit" className="btn btn-primary form-control">
						save
					</button>
					<Link className="mt-3 w-100 text-center" to="/">
						or get back to contacts
					</Link>
				</form>
			</div>
		</div>
	);
};

AddContact.propTypes = {
	location: PropTypes.object
};
