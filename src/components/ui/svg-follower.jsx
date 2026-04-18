import { useRef, useEffect, useCallback } from 'react'
import { useIsTouch } from '../../hooks/useMediaQuery'

const DEFAULT_COLORS = ['#FFD700', '#001EBB', '#FF9EEA', '#FFD700', '#001EBB']
const REMOVE_DELAY = 400

export function SVGFollower({
  colors = DEFAULT_COLORS,
  removeDelay = REMOVE_DELAY,
  opacity = 0.55,
}) {
  const svgRef = useRef(null)
  const followersRef = useRef([])
  const animationRef = useRef(null)
  const sizeRef = useRef({ w: window.innerWidth, h: window.innerHeight })
  const isTouch = useIsTouch()

  const animate = useCallback(() => {
    followersRef.current.forEach((f) => f.trim())
    animationRef.current = requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    if (isTouch || !svgRef.current) return

    const svg = svgRef.current

    class Follower {
      constructor(color) {
        this.points = []
        this.color = color
        this.line = document.createElementNS('http://www.w3.org/2000/svg', 'path')
        this.line.style.fill = color
        this.line.style.stroke = color
        this.line.style.strokeWidth = '1'
        svg.appendChild(this.line)
      }

      getDrift() {
        return (Math.random() - 0.5) * 3
      }

      add(position) {
        const direction = { x: 0, y: 0 }
        if (this.points[0]) {
          direction.x = (position.x - this.points[0].position.x) * 0.25
          direction.y = (position.y - this.points[0].position.y) * 0.25
        }

        const point = {
          position,
          time: Date.now(),
          drift: {
            x: this.getDrift() + direction.x / 2,
            y: this.getDrift() + direction.y / 2,
          },
          age: 0,
          direction,
        }

        const shapeChance = Math.random()
        const chance = 0.1
        if (shapeChance < chance) this.makeCircle(point)
        else if (shapeChance < chance * 2) this.makeSquare(point)
        else if (shapeChance < chance * 3) this.makeTriangle(point)

        this.points.unshift(point)
      }

      createLine(points) {
        const path = [points.length ? 'M' : '']
        if (points.length > 0) {
          let forward = true
          let i = 0
          while (i >= 0) {
            const point = points[i]
            const offsetX = point.direction.x * ((i - points.length) / points.length) * 0.6
            const offsetY = point.direction.y * ((i - points.length) / points.length) * 0.6
            const x = point.position.x + (forward ? offsetY : -offsetY)
            const y = point.position.y + (forward ? offsetX : -offsetX)
            point.age += 0.2
            path.push(String(x + point.drift.x * point.age))
            path.push(String(y + point.drift.y * point.age))
            i += forward ? 1 : -1
            if (i === points.length) { i--; forward = false }
          }
        }
        return path.join(' ')
      }

      trim() {
        if (this.points.length > 0) {
          const last = this.points[this.points.length - 1]
          if (last.time < Date.now() - removeDelay) this.points.pop()
        }
        this.line.setAttribute('d', this.createLine(this.points))
      }

      makeCircle(point) {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle')
        const radius = (Math.abs(point.direction.x) + Math.abs(point.direction.y)) * 1
        circle.setAttribute('r', String(radius))
        circle.style.fill = this.color
        circle.setAttribute('cx', '0')
        circle.setAttribute('cy', '0')
        this.moveShape(circle, point)
      }

      makeSquare(point) {
        const size = (Math.abs(point.direction.x) + Math.abs(point.direction.y)) * 1.5
        const square = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
        square.setAttribute('width', String(size))
        square.setAttribute('height', String(size))
        square.style.fill = this.color
        this.moveShape(square, point)
      }

      makeTriangle(point) {
        const size = (Math.abs(point.direction.x) + Math.abs(point.direction.y)) * 1.5
        const triangle = document.createElementNS('http://www.w3.org/2000/svg', 'polygon')
        triangle.setAttribute('points', `0,0 ${size},${size / 2} 0,${size}`)
        triangle.style.fill = this.color
        this.moveShape(triangle, point)
      }

      moveShape(shape, point) {
        svg.appendChild(shape)
        const driftX = point.position.x + point.direction.x * (Math.random() * 20) + point.drift.x * (Math.random() * 10)
        const driftY = point.position.y + point.direction.y * (Math.random() * 20) + point.drift.y * (Math.random() * 10)
        shape.style.transform = `translate(${point.position.x}px, ${point.position.y}px)`
        shape.style.transition = 'all 0.5s ease-out'
        setTimeout(() => {
          shape.style.transform = `translate(${driftX}px, ${driftY}px) scale(0) rotate(${Math.random() * 360}deg)`
          setTimeout(() => {
            if (svg.contains(shape)) svg.removeChild(shape)
          }, 500)
        }, 10)
      }
    }

    followersRef.current = colors.map((color) => new Follower(color))
    animate()

    const onMouseMove = (e) => {
      const position = { x: e.clientX, y: e.clientY }
      followersRef.current.forEach((f) => f.add(position))
    }

    const onResize = () => {
      sizeRef.current = { w: window.innerWidth, h: window.innerHeight }
    }

    window.addEventListener('mousemove', onMouseMove)
    window.addEventListener('resize', onResize)

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
      window.removeEventListener('mousemove', onMouseMove)
      window.removeEventListener('resize', onResize)
      // Clean up SVG children
      while (svg.firstChild) svg.removeChild(svg.firstChild)
      followersRef.current = []
    }
  }, [colors, removeDelay, animate, isTouch])

  if (isTouch) return null

  return (
    <svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      style={{
        position: 'fixed',
        inset: 0,
        width: '100vw',
        height: '100vh',
        pointerEvents: 'none',
        zIndex: 9998,
        opacity,
      }}
    />
  )
}
