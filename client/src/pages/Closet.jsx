import { mockCloset } from '../data/mockCloset'

function Closet() {
  return (
    <div style={{ padding: '2rem' }}>
      <h1>Your Closet</h1>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
        {mockCloset.map((item) => (
          <div key={item._id} style={{ border: '1px solid #ccc', padding: '1rem' }}>
            <img src={item.imageUrl} alt={item.category} style={{ width: '100%' }} />
            <p>{item.category} — {item.color}</p>
            <p>{item.brand}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default Closet