import Mainnavigation from "./MainNavigation";

function Layout(props){
    return (
        <div>
            <Mainnavigation/>
            <main>{props.children}</main>
        </div>
    )
}

export default Layout;