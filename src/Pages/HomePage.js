import NavbarComponent from "../Components/Navbar";
import Sidebar from "../Components/Sidebar";
import AllBooks from "../Components/AllBooks";
import SlideShow from "../Components/SlideShow";
import { ContentWrapper, PageWrapper } from "reacthalfmoon";
import { useState } from "react";
import { useLocation } from 'react-router-dom';

export default function HomePage(){
    const [search, setSearch] = useState('');
    const [bookGenre, setBookGenre] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const location = useLocation();
    const isInCorrectSite = location.pathname === '/';

    return(
    <PageWrapper withSidebar isSidebarOpen={isSidebarOpen} toggle={() => {setIsSidebarOpen(!isSidebarOpen)}}  withNavbar withTransitions>
        <NavbarComponent onSearchChange={setSearch} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen} isInCorrectSite={isInCorrectSite}/>
        <Sidebar onGenreChange={setBookGenre} />
        <ContentWrapper>
            <SlideShow />
            <AllBooks search={search} bookGenre={bookGenre}/>
        </ContentWrapper>
    </PageWrapper>
    )
};
