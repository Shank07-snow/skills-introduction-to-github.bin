import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const initialRoles = {
  rms: [{ id: 1, name: 'Alpha Supplier', place: 'Mumbai', addr: '0x1111...AAAA' }],
  man: [{ id: 1, name: 'Beta Manufacturing', place: 'Pune', addr: '0x2222...BBBB' }],
  dis: [{ id: 1, name: 'Gamma Distribution', place: 'Delhi', addr: '0x3333...CCCC' }],
  ret: [{ id: 1, name: 'Delta Retail', place: 'Bangalore', addr: '0x4444...DDDD' }],
}

function addEntry(list, values) {
  return [...list, { id: list.length + 1, ...values }]
}

function AssignRoles() {
  const navigate = useNavigate()
  const [rms, setRms] = useState(initialRoles.rms)
  const [man, setMan] = useState(initialRoles.man)
  const [dis, setDis] = useState(initialRoles.dis)
  const [ret, setRet] = useState(initialRoles.ret)

  const [rmsForm, setRmsForm] = useState({ addr: '', name: '', place: '' })
  const [manForm, setManForm] = useState({ addr: '', name: '', place: '' })
  const [disForm, setDisForm] = useState({ addr: '', name: '', place: '' })
  const [retForm, setRetForm] = useState({ addr: '', name: '', place: '' })

  return (
    <div>
      <span>
        <b>Current Account Address:</b> 0xA1b2C3d4E5f6...
      </span>{' '}
      <span onClick={() => navigate('/')} className="btn btn-outline-danger btn-sm">
        HOME
      </span>

      <h4>Raw Material Suppliers:</h4>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          setRms((prev) => addEntry(prev, rmsForm))
          setRmsForm({ addr: '', name: '', place: '' })
        }}
      >
        <input
          className="form-control-sm"
          type="text"
          value={rmsForm.addr}
          onChange={(e) => setRmsForm((s) => ({ ...s, addr: e.target.value }))}
          placeholder="Ethereum Address"
          required
        />
        <input
          className="form-control-sm"
          type="text"
          value={rmsForm.name}
          onChange={(e) => setRmsForm((s) => ({ ...s, name: e.target.value }))}
          placeholder="Raw Material Supplier Name"
          required
        />
        <input
          className="form-control-sm"
          type="text"
          value={rmsForm.place}
          onChange={(e) => setRmsForm((s) => ({ ...s, place: e.target.value }))}
          placeholder="Based In"
          required
        />
        <button className="btn btn-outline-success btn-sm">Register</button>
      </form>
      <RoleTable data={rms} />

      <h4>Manufacturers:</h4>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          setMan((prev) => addEntry(prev, manForm))
          setManForm({ addr: '', name: '', place: '' })
        }}
      >
        <input
          className="form-control-sm"
          type="text"
          value={manForm.addr}
          onChange={(e) => setManForm((s) => ({ ...s, addr: e.target.value }))}
          placeholder="Ethereum Address"
          required
        />
        <input
          className="form-control-sm"
          type="text"
          value={manForm.name}
          onChange={(e) => setManForm((s) => ({ ...s, name: e.target.value }))}
          placeholder="Manufacturer Name"
          required
        />
        <input
          className="form-control-sm"
          type="text"
          value={manForm.place}
          onChange={(e) => setManForm((s) => ({ ...s, place: e.target.value }))}
          placeholder="Based In"
          required
        />
        <button className="btn btn-outline-success btn-sm">Register</button>
      </form>
      <RoleTable data={man} />

      <h4>Distributors:</h4>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          setDis((prev) => addEntry(prev, disForm))
          setDisForm({ addr: '', name: '', place: '' })
        }}
      >
        <input
          className="form-control-sm"
          type="text"
          value={disForm.addr}
          onChange={(e) => setDisForm((s) => ({ ...s, addr: e.target.value }))}
          placeholder="Ethereum Address"
          required
        />
        <input
          className="form-control-sm"
          type="text"
          value={disForm.name}
          onChange={(e) => setDisForm((s) => ({ ...s, name: e.target.value }))}
          placeholder="Distributor Name"
          required
        />
        <input
          className="form-control-sm"
          type="text"
          value={disForm.place}
          onChange={(e) => setDisForm((s) => ({ ...s, place: e.target.value }))}
          placeholder="Based In"
          required
        />
        <button className="btn btn-outline-success btn-sm">Register</button>
      </form>
      <RoleTable data={dis} />

      <h4>Retailers:</h4>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          setRet((prev) => addEntry(prev, retForm))
          setRetForm({ addr: '', name: '', place: '' })
        }}
      >
        <input
          className="form-control-sm"
          type="text"
          value={retForm.addr}
          onChange={(e) => setRetForm((s) => ({ ...s, addr: e.target.value }))}
          placeholder="Ethereum Address"
          required
        />
        <input
          className="form-control-sm"
          type="text"
          value={retForm.name}
          onChange={(e) => setRetForm((s) => ({ ...s, name: e.target.value }))}
          placeholder="Retailer Name"
          required
        />
        <input
          className="form-control-sm"
          type="text"
          value={retForm.place}
          onChange={(e) => setRetForm((s) => ({ ...s, place: e.target.value }))}
          placeholder="Based In"
          required
        />
        <button className="btn btn-outline-success btn-sm">Register</button>
      </form>
      <RoleTable data={ret} />
    </div>
  )
}

function RoleTable({ data }) {
  return (
    <table className="table table-sm">
      <thead>
        <tr>
          <th scope="col">ID</th>
          <th scope="col">Name</th>
          <th scope="col">Place</th>
          <th scope="col">Ethereum Address</th>
        </tr>
      </thead>
      <tbody>
        {data.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>{item.place}</td>
            <td>{item.addr}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default AssignRoles
