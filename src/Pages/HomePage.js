import NavbarComponent from "../Components/Navbar";
import SlideShow from "../Components/SlideShow";
import { ContentWrapper } from "reacthalfmoon";
import AllBooks from "../Components/AllBooks";
import { useState } from "react";

export default function HomePage(){
    const [search, setSearch] = useState('');
    const [bookGenre, setBookGenre] = useState('');

    return<div>
        <NavbarComponent onSearchChange={setSearch} onGenreChange={setBookGenre}/>
        <ContentWrapper>
            <SlideShow />
            <AllBooks search={search} bookGenre={bookGenre}/>
        </ContentWrapper>
    </div>
};
