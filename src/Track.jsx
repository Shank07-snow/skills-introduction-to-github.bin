import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const stageLabels = ['Ordered', 'Raw Material Supplied', 'Manufactured', 'Distributed', 'Retailed', 'Sold']

const meds = [
  { id: 1, name: 'Wheat', description: 'Premium batch', stage: 5, RMSid: 1, MANid: 1, DISid: 1, RETid: 1 },
  { id: 2, name: 'Rice', description: 'Export quality', stage: 3, RMSid: 1, MANid: 1, DISid: 1, RETid: 1 },
  { id: 3, name: 'Sugar', description: 'Refined', stage: 1, RMSid: 1, MANid: 1, DISid: 1, RETid: 1 },
]

const RMS = [{ id: 1, name: 'Alpha Supplier', place: 'Mumbai' }]
const MAN = [{ id: 1, name: 'Beta Manufacturing', place: 'Pune' }]
const DIS = [{ id: 1, name: 'Gamma Distribution', place: 'Delhi' }]
const RET = [{ id: 1, name: 'Delta Retail', place: 'Bangalore' }]

function Track() {
  const navigate = useNavigate()
  const [idInput, setIdInput] = useState('')
  const [selected, setSelected] = useState(null)

  const stage = selected?.stage ?? -1

  const renderParty = (title, party) => (
    <article className="col-3">
      <h4>
        <u>{title}</u>
      </h4>
      <p>
        <b>ID: </b>
        {party.id}
      </p>
      <p>
        <b>Name:</b> {party.name}
      </p>
      <p>
        <b>Place: </b>
        {party.place}
      </p>
    </article>
  )

  if (selected) {
    return (
      <div className="container-xl">
        <article className="col-4">
          <h3>
            <b>
              <u>Goods:</u>
            </b>
          </h3>
          <span>
            <b>Goods ID: </b>
            {selected.id}
          </span>
          <br />
          <span>
            <b>Name:</b> {selected.name}
          </span>
          <br />
          <span>
            <b>Description: </b>
            {selected.description}
          </span>
          <br />
          <span>
            <b>Current stage: </b>
            {stageLabels[selected.stage]}
          </span>
        </article>
        <hr />
        <br />
        {stage === 0 ? (
          <h5>Goods Not Yet Processed...</h5>
        ) : (
          <section className="row">
            {stage >= 1 && renderParty('Raw Materials Supplied by:', RMS[selected.RMSid - 1])}
            {stage >= 2 && <span>&#10132;</span>}
            {stage >= 2 && renderParty('Manufactured by:', MAN[selected.MANid - 1])}
            {stage >= 3 && <span>&#10132;</span>}
            {stage >= 3 && renderParty('Distributed by:', DIS[selected.DISid - 1])}
            {stage >= 4 && <span>&#10132;</span>}
            {stage >= 4 && renderParty('Retailed by:', RET[selected.RETid - 1])}
            {stage >= 5 && <span>&#10132;</span>}
            {stage >= 5 && (
              <article className="col-3">
                <h4>
                  <u>Sold</u>
                </h4>
              </article>
            )}
          </section>
        )}

        <button onClick={() => setSelected(null)} className="btn btn-outline-success btn-sm">
          Track Another Item
        </button>
        <span onClick={() => navigate('/')} className="btn btn-outline-danger btn-sm">
          {' '}
          HOME
        </span>
      </div>
    )
  }

  return (
    <div>
      <span>
        <b>Current Account Address:</b> 0xA1b2C3d4E5f6...
      </span>{' '}
      <span onClick={() => navigate('/')} className="btn btn-outline-danger btn-sm">
        HOME
      </span>
      <table className="table table-sm table-bordered">
        <thead>
          <tr>
            <th scope="col">Goods ID</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Current Processing Stage</th>
          </tr>
        </thead>
        <tbody>
          {meds.map((med) => (
            <tr key={med.id}>
              <td>{med.id}</td>
              <td>{med.name}</td>
              <td>{med.description}</td>
              <td>{stageLabels[med.stage]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h5>Enter Goods ID to Track it</h5>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          setSelected(meds.find((item) => item.id === Number(idInput)) || null)
        }}
      >
        <input
          className="form-control-sm"
          type="text"
          value={idInput}
          onChange={(e) => setIdInput(e.target.value)}
          placeholder="Enter Goods ID"
          required
        />
        <button className="btn btn-outline-success btn-sm">Track</button>
      </form>
    </div>
  )
}

export default Track
