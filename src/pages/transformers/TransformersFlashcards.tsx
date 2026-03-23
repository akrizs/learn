import { Link } from 'react-router-dom'
import { SquareStack } from 'lucide-react'
import FlashcardSession from '../../components/Flashcard/FlashcardSession'
import { TRANSFORMERS_FLASHCARDS } from '../../content/transformers/flashcards'
import './TransformersFlashcards.css'

export default function TransformersFlashcards() {
  return (
    <div className="flashcards-page">
      <div className="flashcards-hero">
        <div className="flashcards-badge">
          <SquareStack size={14} />
          Flashcard Mode
        </div>
        <h1>Transformers Flashcards</h1>
        <p>
          Test your knowledge with flashcards covering key concepts,
          terminology, and practical skills from the learning path.
        </p>
        <span className="flashcards-count">{TRANSFORMERS_FLASHCARDS.totalCards} cards</span>
      </div>

      {/* Flashcard Study Session */}
      <FlashcardSession deck={TRANSFORMERS_FLASHCARDS} />

      {/* Back Link */}
      <div className="flashcards-back">
        <Link to="/transformers" className="back-link">
          ← Back to Learning
        </Link>
      </div>
    </div>
  )
}
