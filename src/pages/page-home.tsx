import Container from "../components/container";
import AlbumsFilter from "../contexts/albums/components/albums-filter";
import PhotosList from "../contexts/photos/components/photos-list";

export default function PageHome() { 
    return ( 
        <Container>
            <AlbumsFilter albums={[
                {id:"2342", title:"Album1"}, 
                {id:"2323", title:"Album2"}, 
                {id:"12312312", title: "Album3"},
            ]} className="mb-9"
            />
            <PhotosList
            // photos={[]}
        
            photos={
            [
                {
                    id: "123", 
                    title: "olá mundo", 
                    imageId:"portrait-tower.png", 
                    albums: [
                        {id:"2342", title:"Album1"}, 
                        {id:"2323", title:"Album2"}, 
                        {id:"12312312", title: "Album3"}
                    ]
                }, 
                {
                    id:"12324", 
                    title: "ola mundo2", 
                    imageId:"portrait-tower.png", 
                    albums: [
                        {id:"2342", title:"Album1"}, 
                        {id:"2323", title:"Album2"}, 
                        {id:"12312312", title: "Album3"}                        
                    ]
                },
                {
                    id:"12324", 
                    title: "ola mundo2", 
                    imageId:"portrait-tower.png", 
                    albums: [
                        {id:"2342", title:"Album1"}, 
                        {id:"2323", title:"Album2"}, 
                        {id:"12312312", title: "Album3"}                        
                    ]
                },
                {
                    id:"12324", 
                    title: "ola mundo2", 
                    imageId:"portrait-tower.png", 
                    albums: [
                        {id:"2342", title:"Album1"}, 
                        {id:"2323", title:"Album2"}, 
                        {id:"12312312", title: "Album3"}                        
                    ]
                },
                {
                    id:"12324", 
                    title: "ola mundo2", 
                    imageId:"portrait-tower.png", 
                    albums: [
                        {id:"2342", title:"Album1"}, 
                        {id:"2323", title:"Album2"}, 
                        {id:"12312312", title: "Album3"}                        
                    ]
                },
                {
                    id:"12324", 
                    title: "ola mundo2", 
                    imageId:"portrait-tower.png", 
                    albums: [
                        {id:"2342", title:"Album1"}, 
                        {id:"2323", title:"Album2"}, 
                        {id:"12312312", title: "Album3"}                        
                    ]
                }
            ]
        
        }
            
            
            
            
            
            />
        </Container>
    )
}