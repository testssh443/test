import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import axios from "axios";
import { linkDB } from "../constant";
// import { Bar } from "react-chartjs-2";

export default function Dashboard() {
  const [rices, setRices] = useState({});
  const [types, setTypes] = useState({});
  const [rices1, setRices1] = useState();

  const AllRice = Object.keys(rices).map((id) => rices[id].RiceCategory);

  const TypeRices = (typeRice) => {
    return AllRice.filter((RiceType) => RiceType === typeRice);
  };

  const Type = Object.keys(types).map((id) => types[id].type);
  // const TypeUsers = (typeUser) => {
  //   return AllUsers.filter((user) => user === typeUser);
  // };

  const UserData = [{}];

  useEffect(() => {
    axios.get(linkDB + "/rice").then((response) => {
      setRices(response.data);
    });

    axios.get(linkDB + "/type").then((response) => {
      console.log(response.data);
      setTypes(response.data);
    });
  }, []);

  console.log(TypeRices('ข้าวหอมมะลิทุ่งกุลา').length);
  console.log("Type", Type);
  console.log("AllRice", AllRice);
  console.log("rices", rices);
  console.log("types", types);

  
  let na = AllRice.length;
  // console.log(na);

  return (
    <div>


      <Container>
        {(() => {
          if (na == 0) {
            return (
              <div>
                <table id="" className="charts-css column show-labels">
                  <tbody>
                    {Type.map((index, value) => (
                      <tr key={index}>
                        <th scope="row" style={{fontSize:"9px"}}> {Type[value]} </th>
                        <td style={{ "0--size": TypeRices(Type[value]).length/rices.length }}></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          } else {
            return (
              <div>
                <table id="column-example-20" className="charts-css column show-labels">
                  <tbody>
                    {Type.map((index, value) => (
                      <tr key={index}>
                        <th scope="row" style={{fontSize:"9px"}}> {Type[value]} </th>
                        <td style={{ "--size": TypeRices(Type[value]).length/rices.length }}></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )
          }
        })()}
      </Container>


    </div>
  );
}
