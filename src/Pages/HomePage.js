import NavbarComponent from "../Components/Navbar";
import SlideShow from "../Components/SlideShow";
import { ContentWrapper, PageWrapper } from "reacthalfmoon";
import AllBooks from "../Components/AllBooks";
import Sidebar from "../Components/Sidebar";
import { useState } from "react";


export default function HomePage(){
    const [search, setSearch] = useState('');
    const [bookGenre, setBookGenre] = useState('');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);


    return(
    <PageWrapper withSidebar isSidebarOpen={isSidebarOpen} toggle={() => {setIsSidebarOpen(!isSidebarOpen)}}  withNavbar withTransitions>

        <NavbarComponent onSearchChange={setSearch} isSidebarOpen={isSidebarOpen} setIsSidebarOpen={setIsSidebarOpen}/>
        <Sidebar onGenreChange={setBookGenre}/>
        <ContentWrapper>
            <SlideShow />
            <AllBooks search={search} bookGenre={bookGenre}/>
        </ContentWrapper>
    </PageWrapper>
    )
};
