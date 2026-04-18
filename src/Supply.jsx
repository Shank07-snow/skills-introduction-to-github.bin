import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const stageLabels = ['Ordered', 'Raw Material Supplied', 'Manufactured', 'Distributed', 'Retailed', 'Sold']

function Supply() {
  const navigate = useNavigate()
  const [meds, setMeds] = useState([
    { id: 1, name: 'Wheat', description: 'Premium batch', stage: 0 },
    { id: 2, name: 'Rice', description: 'Export quality', stage: 2 },
  ])
  const [idInput, setIdInput] = useState('')

  const updateStage = (targetStage) => {
    const id = Number(idInput)
    if (!id) return
    setMeds((prev) =>
      prev.map((item) => (item.id === id ? { ...item, stage: Math.max(item.stage, targetStage) } : item)),
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
      <h6>
        <b>Supply Chain Flow:</b>
      </h6>
      <p>Goods Order -&gt; Raw Material Supplier -&gt; Manufacturer -&gt; Distributor -&gt; Retailer -&gt; Consumer</p>
      <table className="table table-sm table-dark">
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

      <StepForm
        title="Step 1: Supply Raw Materials"
        subtitle="(Only a registered Raw Material Supplier can perform this step):-"
        buttonLabel="Supply"
        idInput={idInput}
        setIdInput={setIdInput}
        onSubmit={() => updateStage(1)}
      />
      <StepForm
        title="Step 2: Manufacture"
        subtitle="(Only a registered Manufacturer can perform this step):-"
        buttonLabel="Manufacture"
        idInput={idInput}
        setIdInput={setIdInput}
        onSubmit={() => updateStage(2)}
      />
      <StepForm
        title="Step 3: Distribute"
        subtitle="(Only a registered Distributor can perform this step):-"
        buttonLabel="Distribute"
        idInput={idInput}
        setIdInput={setIdInput}
        onSubmit={() => updateStage(3)}
      />
      <StepForm
        title="Step 4: Retail"
        subtitle="(Only a registered Retailer can perform this step):-"
        buttonLabel="Retail"
        idInput={idInput}
        setIdInput={setIdInput}
        onSubmit={() => updateStage(4)}
      />
      <StepForm
        title="Step 5: Mark as sold"
        subtitle="(Only a registered Retailer can perform this step):-"
        buttonLabel="Sold"
        idInput={idInput}
        setIdInput={setIdInput}
        onSubmit={() => updateStage(5)}
      />
      <hr />
    </div>
  )
}

function StepForm({ title, subtitle, buttonLabel, idInput, setIdInput, onSubmit }) {
  return (
    <>
      <h5>
        <b>{title}</b>
        {subtitle}
      </h5>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit()
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
        <button className="btn btn-outline-success btn-sm">{buttonLabel}</button>
      </form>
      <hr />
      <br />
    </>
  )
}

export default Supply
