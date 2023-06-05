const screen = {
    userProfile: document.querySelector(".profile-data"),
    renderUser(user){
        this.userProfile.innerHTML = `<div class="info">
                        <img src="${user.avatarUrl}" alt="Foto do perfil do usuário" />
                        <div class="data">
                            <h1>${user.name ?? "Não possui nome cadastrado 😢"}</h1>
                            <p>${user.bio ?? "Não possui bio cadastrada 😢"}</p>
                            <div class="follow">
                            <p class="followers-following">👥 Seguidores: ${user.followers} • Seguindo: ${user.following}</p>
                            </div>
                        </div>
                    </div>`;
        this.renderRepositories(user.repositories);
        this.renderEvents(user.events);
    },
    renderRepositories(repositories){
        let repositoriesItens = '';
        repositories.forEach(repo => {repositoriesItens += `<li>
                                                                    <a href="${repo.html_url}" target="_blank">
                                                                        ${repo.name}
                                                                        <ul>
                                                                            <li>🍴 ${repo.forks_count}</li>
                                                                            <li>⭐ ${repo.stargazers_count}</li>
                                                                            <li>👀 ${repo.stargazers_count}</li>
                                                                            <li>🧑🏽‍💻 ${repo.language ?? "Não definida"}</li>
                                                                        </ul>
                                                                    </a>
                                                                </li>`;
    });
        if(repositories.length > 0){
            this.userProfile.innerHTML += `<div class="repositories section">
                                                <h2>Repositórios</h2>
                                                <ul>${repositoriesItens}</ul>
                                            </div>`;
        }
    },
    renderEvents(events){
        let eventsItens = '';
        events.forEach(event => {
            const eventType = event.type === "CreateEvent" || event.type === "PushEvent";

            if(eventType){
                eventsItens += `<li> <strong>${event.repo.name}</strong> - ${event.payload.commits?.[0].message ?? `Create ${event.payload.ref_type}`} </li>`
            }
        });

        if(events.length > 0 && eventsItens !== ""){
            this.userProfile.innerHTML += `<div class="events section">
                                                <h2>Eventos</h2>
                                                <ul>${eventsItens}</ul>
                                            </div>`;
        } else {
            this.userProfile.innerHTML += `<h3>Não há eventos</h3>`;
        }
    },
    renderNotFound(){
        this.userProfile.innerHTML = "<h3>Usuário não encontrado</h3>";
    }
}

export { screen };