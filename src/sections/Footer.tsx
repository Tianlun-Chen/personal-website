export default function Footer() {
  return (
    <footer
      className="text-center"
      style={{
        background: '#2D3436',
        borderTop: '1px solid rgba(255, 255, 255, 0.06)',
        padding: '32px 2rem',
      }}
    >
      <p
        className="font-light"
        style={{
          color: 'rgba(255, 253, 248, 0.3)',
          fontSize: '13px',
        }}
      >
        &copy; 2025 Tianlun Chen &middot; Built with care
      </p>
    </footer>
  )
}
