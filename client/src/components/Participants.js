import React from 'react'

export default function Participants(props) {

  const enDur = [
    { lastname: "Rietsch", firstname: "Virgile", role: "Student"  },
    { lastname: "Olivier", firstname: "Lauren", role: "Student" },
    { lastname: "Bastard", firstname: "Mayana", role: "Student"},
    { lastname: "Culdaut", firstname: "Thomas", role: "Teacher"},
    { lastname: "Vivier", firstname: "Stéphane", role: "Student"}
  ]
  return (
    <div className="toolsContainer">
      <ul>
        {enDur.map((participant) =>
          <li>
            <img src="" alt="" />
            <h3>{participant.firstname} {participant.lastname} </h3>
            <p>{participant.role}</p>
          </li>
        )}
      </ul>
    </div>
  )
}
