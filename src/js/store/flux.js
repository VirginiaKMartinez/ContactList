const getState = ({ getStore, setStore }) => {
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
			addContact: user => {
				fetch("https://assets.breatheco.de/apis/fake/contact/", {
					method: "POST", // or 'POST'
					body: JSON.stringify(user), // data can be `string` or {object}!
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(res => res.json())
					.then(response => console.log("Success:", JSON.stringify(response)))
					.catch(error => console.error("Error:", error));
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
