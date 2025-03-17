import { useState, useEffect, useRef } from 'react'
import classNames from 'classnames'
import { useConfig } from '../ConfigProvider'
import { useForm, useFormItem } from '../Form/context'
import { CONTROL_SIZES } from '../utils/constants'
import isNil from 'lodash/isNil'
import type { CommonProps, TypeAttributes } from '../@types/common'
import type {
    TextareaHTMLAttributes,
    ElementType,
    ReactNode,
    ClassAttributes,
    Ref,
} from 'react'

export interface TextareaProps
    extends CommonProps,
        Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, 'size' | 'prefix' | 'suffix'> {
    asElement?: ElementType
    disabled?: boolean
    invalid?: boolean
    prefix?: string | ReactNode
    rows?: number
    ref?: Ref<HTMLTextAreaElement>
    size?: TypeAttributes.ControlSize
    suffix?: string | ReactNode
    unstyle?: boolean
}

const Textarea = (props: TextareaProps) => {
    const {
        asElement: Component = 'textarea',
        className,
        disabled,
        invalid,
        prefix,
        size,
        suffix,
        rows = 3,
        ref,
        style,
        unstyle = false,
        ...rest
    } = props

    const [prefixGutter, setPrefixGutter] = useState(0)
    const [suffixGutter, setSuffixGutter] = useState(0)

    const { controlSize, direction } = useConfig()
    const formControlSize = useForm()?.size
    const formItemInvalid = useFormItem()?.invalid

    const textareaSize = size || formControlSize || controlSize
    const isTextareaInvalid = invalid || formItemInvalid

    const fixControlledValue = (
        val: string | number | readonly string[] | undefined,
    ) => {
        if (typeof val === 'undefined' || val === null) {
            return ''
        }
        return val
    }

    if ('value' in props) {
        rest.value = fixControlledValue(props.value)
        delete rest.defaultValue
    }

    const textareaDefaultClass = 'textarea'
    const textareaSizeClass = `textarea-${textareaSize}`
    // const textareaSizeClass = `textarea-${textareaSize} ${CONTROL_SIZES[textareaSize].h}`
    const textareaFocusClass = `focus:ring-primary focus:border-primary`
    const textareaWrapperClass = classNames(
        'textarea-wrapper',
        prefix || suffix ? className : '',
    )
    const textareaClass = classNames(
        textareaDefaultClass,
        textareaSizeClass,
        !isTextareaInvalid && textareaFocusClass,
        disabled && 'textarea-disabled',
        isTextareaInvalid && 'textarea-invalid',
        className
    )

    const prefixNode = useRef<HTMLDivElement>(null)
    const suffixNode = useRef<HTMLDivElement>(null)

    const getAffixSize = () => {
        if (!prefixNode.current && !suffixNode.current) {
            return
        }
        const prefixNodeWidth = prefixNode?.current?.offsetWidth
        const suffixNodeWidth = suffixNode?.current?.offsetWidth

        if (isNil(prefixNodeWidth) && isNil(suffixNodeWidth)) {
            return
        }

        if (prefixNodeWidth) {
            setPrefixGutter(prefixNodeWidth)
        }

        if (suffixNodeWidth) {
            setSuffixGutter(suffixNodeWidth)
        }
    }

    useEffect(() => {
        getAffixSize()
    }, [prefix, suffix])

    const remToPxConversion = (pixel: number) => 0.0625 * pixel

    const affixGutterStyle = () => {
        const leftGutter = `${remToPxConversion(prefixGutter) + 1}rem`
        const rightGutter = `${remToPxConversion(suffixGutter) + 1}rem`
        const gutterStyle: {
            paddingLeft?: string
            paddingRight?: string
        } = {}

        if (direction === 'ltr') {
            if (prefix) {
                gutterStyle.paddingLeft = leftGutter
            }

            if (suffix) {
                gutterStyle.paddingRight = rightGutter
            }
        }

        if (direction === 'rtl') {
            if (prefix) {
                gutterStyle.paddingRight = leftGutter
            }

            if (suffix) {
                gutterStyle.paddingLeft = rightGutter
            }
        }

        return gutterStyle
    }

    const textareaProps = {
        className: !unstyle ? textareaClass : '',
        disabled,
        ref,
        rows,
        style: { ...affixGutterStyle(), ...style },
        ...rest,
    }

    const renderAffixTextarea = (
        <span className={textareaWrapperClass}>
            {prefix ? (
                <div ref={prefixNode} className="textarea-prefix-start">
                    {prefix}
                </div>
            ) : null}
            <Component {...textareaProps} />
            {suffix ? (
                <div ref={suffixNode} className="textarea-suffix-end">
                    {suffix}
                </div>
            ) : null}
        </span>
    )

    return prefix || suffix ? renderAffixTextarea : <Component {...textareaProps} />
}

export default Textarea
