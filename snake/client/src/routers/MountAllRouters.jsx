import NavRouters from './NavRouters'
import GameListRouters from './GameListRouters'

function MountAllRouters() {
    return (
        <>
            <NavRouters />
            <GameListRouters />
        </>
    )
}


export default MountAllRouters