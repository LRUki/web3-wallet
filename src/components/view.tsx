import React, { FC } from 'react'
import styled from 'styled-components'
import {
  background,
  BackgroundProps,
  borders,
  BordersProps,
  color,
  ColorProps,
  flexbox,
  FlexboxProps,
  grid,
  GridProps,
  layout,
  LayoutProps,
  position,
  PositionProps,
  space,
  SpaceProps,
  typography,
  TypographyProps,
  boxShadow,
  BoxShadowProps,
} from 'styled-system'

type StyledSystemProps = TypographyProps &
  SpaceProps &
  LayoutProps &
  ColorProps &
  PositionProps &
  FlexboxProps &
  GridProps &
  BackgroundProps &
  BordersProps &
  BoxShadowProps

const styledSystemProps = [
  typography,
  space,
  layout,
  color,
  position,
  flexbox,
  grid,
  background,
  borders,
  boxShadow,
]

export type ViewProps = StyledSystemProps & React.HTMLAttributes<HTMLDivElement>

export const View: FC<ViewProps> = props => {
  return <ViewRoot {...props}>{props.children}</ViewRoot>
}

const ViewRoot = styled('div')<StyledSystemProps>({}, styledSystemProps)

export const Flexbox: FC<ViewProps> = props => {
  return (
    <View display="flex" {...props}>
      {props.children}
    </View>
  )
}