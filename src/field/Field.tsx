import React from 'react';
import { ReactComponent as BlackKing } from './piece/Chess_kdt45.svg';
import { ReactComponent as BlackQueen } from './piece/Chess_qdt45.svg';
import { ReactComponent as BlackRook } from './piece/Chess_rdt45.svg';
import { ReactComponent as BlackBishop } from './piece/Chess_bdt45.svg';
import { ReactComponent as BlackKnight } from './piece/Chess_ndt45.svg';
import { ReactComponent as BlackPawn } from './piece/Chess_pdt45.svg';
import { ReactComponent as WhiteKing } from './piece/Chess_klt45.svg';
import { ReactComponent as WhiteQueen } from './piece/Chess_qlt45.svg';
import { ReactComponent as WhiteRook } from './piece/Chess_rlt45.svg';
import { ReactComponent as WhiteBishop } from './piece/Chess_blt45.svg';
import { ReactComponent as WhiteKnight } from './piece/Chess_nlt45.svg';
import { ReactComponent as WhitePawn } from './piece/Chess_plt45.svg';

interface FieldProps {
  background: string;
  piece: string;
  isHighlighted: boolean;
  onClick: () => void;
}

const pieceComponents: Record<string, React.FunctionComponent<React.SVGProps<SVGSVGElement>>> = {
  'k': BlackKing,
  'q': BlackQueen,
  'r': BlackRook,
  'b': BlackBishop,
  'n': BlackKnight,
  'p': BlackPawn,
  'K': WhiteKing,
  'Q': WhiteQueen,
  'R': WhiteRook,
  'B': WhiteBishop,
  'N': WhiteKnight,
  'P': WhitePawn
};

const Field = ({ background, piece, isHighlighted, onClick }: FieldProps) => {
  const PieceComponent = pieceComponents[piece];

  return (
    <div
      onClick={onClick}
      style={{
        background: isHighlighted ? 'rgba(0, 255, 0, 0.5)' : background,
        height: '12.5%',
        width: '12.5%',
        fontSize: '40px',
        textAlign: 'center',
        cursor: 'pointer'
      }}
    >
      {PieceComponent && <PieceComponent width="90%"/>}
    </div>
  );
}

export default Field;
