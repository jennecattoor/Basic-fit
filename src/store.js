import create from 'zustand'

const useStore = create(set => ({
    jwt: localStorage.getItem('jwt'),
    isLoggedIn: !!localStorage.getItem('jwt'),
    username: localStorage.getItem('username'),
    profileId: localStorage.getItem('profileId'),
    setLoggedIn: (jwt, username, profileId) => set(state => {
        localStorage.setItem('jwt', jwt);
        localStorage.setItem('username', username);
        localStorage.setItem('profileId', profileId);
        return { ...state, isLoggedIn: !!jwt, username: username, profileId: profileId };
    }),
    logout: () => set(state => {
        localStorage.removeItem('jwt');
        localStorage.removeItem('username');
        return { ...state, isLoggedIn: false, username: "" };
    })
}))

export { useStore }