import './App.css'
import { Card } from './Card'

export function App() {

  return (
    <div className="App">
      <Card
        titulo="Título do card"
        descricao="Lorem ipsum dolor sit amet consectetur, adipisicing elit. Quia repellendus tenetur optio, soluta nihil distinctio iusto, maiores magni vel laudantium excepturi nam. Repudiandae vitae asperiores inventore distinctio, nostrum consectetur nesciunt!"
        autor="João das Neves" />

      <Card
        titulo="Título do segundo card"
        descricao="Lorem ipsum dolor sit amet consectetur adipisicing elit. Quia minima ad quam, sit repellat, rerum explicabo a debitis unde cupiditate, nesciunt possimus esse fugiat. Repudiandae soluta ipsa distinctio aliquid nulla."
        autor="João das Neves" />
        
    </div>

  )
}


