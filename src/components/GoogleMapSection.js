import React, { Component } from 'react'

class GoogleMapSection extends Component {
    render() {
        return (

            <div>
                <div id="googleMap" style={{ height:'400px',width: '100 %', color: 'black'}}></div>
                <script>
                    {function myMap() {
                        var myCenter = new google.maps.LatLng(51.03, 114.04);
                        var mapProp = { center: myCenter, zoom: 12, scrollwheel: false, draggable: false, mapTypeId: google.maps.MapTypeId.ROADMAP };
                        var map = new google.maps.Map(document.getElementById("googleMap"), mapProp);
                        var marker = new google.maps.Marker({ position: myCenter });
                        marker.setMap(map);
                    }}
                </script>
                <script
                    src= "https://maps.googleapis.com/maps/api/js?key=AIzaSyD3M9ELWNFAFXxywrFXFx7SjnA9csL9Llg&callback=myMap" >
                </script>
            </div>
        )
    }
}
export default GoogleMapSection
