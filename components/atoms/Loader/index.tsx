interface LoaderProps {
	text?: string | null
}

const Loader: React.FC<LoaderProps> = ({ text }) => {
	return (
		<>
			<div className="bg-transparent flex flex-col flex-grow space-y-4 items-center justify-center">
				<svg
					fill="none"
					viewBox="0 0 24 24"
					className="w-8 h-8 animate-spin"
				>
					<circle
						className="opacity-25"
						cx="12"
						cy="12"
						r="10"
						stroke="#ff66005e"
						strokeWidth="4"
					/>
					<path
						fill="#ff6600"
						d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
					/>
				</svg>
				{text && <p>{text}</p>}
			</div>
		</>
	)
}

Loader.defaultProps = {
	text: null,
}

export default Loader
