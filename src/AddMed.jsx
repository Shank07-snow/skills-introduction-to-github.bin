import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const stageLabels = ['Ordered', 'Raw Material Supplied', 'Manufactured', 'Distributed', 'Retailed', 'Sold']

function AddMed() {
  const navigate = useNavigate()
  const [meds, setMeds] = useState([
    { id: 1, name: 'Wheat', description: 'Premium batch', stage: 0 },
    { id: 2, name: 'Rice', description: 'Export quality', stage: 2 },
  ])
  const [form, setForm] = useState({ name: '', description: '' })

  return (
    <div>
      <span>
        <b>Current Account Address:</b> 0xA1b2C3d4E5f6...
      </span>{' '}
      <span onClick={() => navigate('/')} className="btn btn-outline-danger btn-sm">
        HOME
      </span>
      <br />
      <h5>Add Goods Order:</h5>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          setMeds((prev) => [
            ...prev,
            {
              id: prev.length + 1,
              name: form.name,
              description: form.description,
              stage: 0,
            },
          ])
          setForm({ name: '', description: '' })
        }}
      >
        <input
          className="form-control-sm"
          type="text"
          value={form.name}
          onChange={(e) => setForm((s) => ({ ...s, name: e.target.value }))}
          placeholder="Goods Name"
          required
        />
        <input
          className="form-control-sm"
          type="text"
          value={form.description}
          onChange={(e) => setForm((s) => ({ ...s, description: e.target.value }))}
          placeholder="Goods Description"
          required
        />
        <button className="btn btn-outline-success btn-sm">Order</button>
      </form>
      <br />
      <h5>Ordered Goods:</h5>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Current Stage</th>
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
    </div>
  )
}

export default AddMed
