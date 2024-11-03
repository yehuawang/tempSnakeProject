import NavRouters from './NavRouters'
import GameListRouters from './GameListRouters'

function MountAllRouters({ loggedInUser, setLoggedInUser }) {
    return (
        <>
            <NavRouters loggedInUser={loggedInUser} setLoggedInUser={setLoggedInUser} />
            <GameListRouters loggedInUser={loggedInUser} />
        </>
    )
}

export default MountAllRouters