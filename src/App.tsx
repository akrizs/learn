import { Routes, Route } from 'react-router-dom'
import MainLayout from './layouts/MainLayout'
import Home from './pages/Home'
import Transformers from './pages/transformers/Transformers'
import TransformersSlides from './pages/transformers/TransformersSlides'
import TransformersFlashcards from './pages/transformers/TransformersFlashcards'
import TransformersPractice from './pages/transformers/TransformersPractice'

export default function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/transformers" element={<Transformers />} />
        <Route path="/transformers/slides" element={<TransformersSlides />} />
        <Route path="/transformers/flashcards" element={<TransformersFlashcards />} />
        <Route path="/transformers/practice" element={<TransformersPractice />} />
      </Routes>
    </MainLayout>
  )
}
