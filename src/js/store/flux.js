const getState = ({ getStore, setStore, getActions }) => {
	return {
		store: {
			contactList: [],
			idDeleteCard: ""
		},
		actions: {
			loadingData: async () => {
				const state = getStore();
				try {
					const res = await fetch("https://assets.breatheco.de/apis/fake/contact/agenda/Virginia");
					const data = await res.json();
					setStore({ ...state, contactList: data });
					return Promise.resolve(true);
				} catch (err) {
					console.log(err);
				}
			},
			addContact: (contact, title, id) => {
				console.log(contact, "En flux");

				fetch("https://assets.breatheco.de/apis/fake/contact/" + id, {
					method: title == "Update contact" ? "PUT" : "POST", // or ‘POST’
					body: JSON.stringify(contact),
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(respose => {
						if (respose.ok) {
							getActions().loadAgenda();
						}
					})
					.catch(err => console.log(err));
			},

			deleteContact: async id => {
				try {
					const res = await fetch("https://assets.breatheco.de/apis/fake/contact/" + id, {
						method: "DELETE",
						headers: {
							"Content-Type": "application/json"
						}
					});
					console.log("succes::", res);
					return Promise.resolve(true);
				} catch (err) {
					console.log(err);
				}
			},
			setId: id => {
				const state = setStore();
				setStore({ ...state, idDeleteCard: id });
			}
		}
	};
};

export default getState;
