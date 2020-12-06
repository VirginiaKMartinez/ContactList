import React, { useState, useEffect, useContext } from "react";
import { Link } from "react-router-dom";

import { ContactCard } from "../component/ContactCard.js";
import { Modal } from "../component/Modal";
import { Context } from "../store/appContext";

export const Contacts = () => {
	const { store, actions } = useContext(Context);
	//STATE COMPONENT
	const [refresh, setRefresh] = useState(false);
	const [state, setState] = useState({
		showModal: false
	});
	useEffect(() => {
		actions.loadingData();
	}, [refresh]);

	return (
		<div className="container">
			<div>
				<p className="text-right my-3">
					<Link
						to={{
							pathname: "/add",
							state: {
								title: "Add new contact"
							}
						}}
						className="btn btn-success">
						Add new contact
					</Link>
				</p>
				<div id="contacts" className="panel-collapse collapse show" aria-expanded="true">
					<ul className="list-group pull-down" id="contact-list">
						{store.contactList.map((user, index) => (
							<ContactCard key={index} contact={user} onDelete={() => setState({ showModal: true })} />
						))}
					</ul>
				</div>
			</div>
			<Modal
				show={state.showModal}
				onClose={() => setState({ showModal: false })}
				onRefresh={() => setRefresh(!refresh)}
			/>
		</div>
	);
};
