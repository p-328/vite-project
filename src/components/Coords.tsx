import React from 'react'
import '../App.css';

const Coords = ({ latitude, longitude }: any) => {
    return (
        <div>
            <h1>Coordinates</h1>
            <div className='detail'>
                <table>
                    <thead>
                        <tr>
                            <th>Latitude</th>
                            <th>Longitude</th>  
                        </tr>      
                    </thead>
                    <tbody>
                        <tr>
                            <td>{latitude}</td>      
                            <td>{longitude}</td>      
                        </tr>  
                    </tbody>      
                </table>
            </div>
        </div>  
    )
}

export default Coords
