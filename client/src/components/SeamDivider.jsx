function SeamDivider({ label }) {
  return (
    <div className="flex items-center gap-3 my-6">
      <div className="flex-1 border-t border-dashed" style={{ borderColor: 'var(--color-camel)' }} />
      {label && (
        <span
          className="text-xs uppercase tracking-widest"
          style={{ color: 'var(--color-tan)' }}
        >
          {label}
        </span>
      )}
      <div className="flex-1 border-t border-dashed" style={{ borderColor: 'var(--color-camel)' }} />
    </div>
  )
}

export default SeamDivider